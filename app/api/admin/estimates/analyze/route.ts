import { NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define pricing tiers and factors
const PRICING_TIERS = {
  MINIMUM_LOAD: {
    name: 'Minimum Load',
    range: { min: 75, max: 125 },
    description: 'Small items or single items',
    examples: ['Single furniture item', 'Small appliance', 'Box of smaller items']
  },
  QUARTER_TRUCK: {
    name: '1/4 Truck Load',
    range: { min: 125, max: 225 },
    description: 'About the size of a standard bathtub',
    examples: ['Couch + small table', 'Refrigerator + boxes', 'Several bags and small items']
  },
  HALF_TRUCK: {
    name: '1/2 Truck Load',
    range: { min: 250, max: 375 },
    description: 'Roughly equivalent to a 5×5 storage unit',
    examples: ['Apartment bedroom set', 'Garage clean-up', 'Small basement cleanout']
  },
  FULL_TRUCK: {
    name: 'Full Truck Load',
    range: { min: 500, max: 600 },
    description: 'About the size of a standard one-car garage',
    examples: ['Complete apartment cleanout', 'Large basement or garage', 'Multiple rooms of furniture']
  }
};

const ADDITIONAL_FEES = {
  APPLIANCE_REMOVAL: {
    name: 'Appliance Removal',
    fee: 75,
    description: 'Per large appliance (refrigerators, washers, dryers, etc.)'
  },
  STAIRS_FEE: {
    name: 'Stairs Fee',
    fee: 50,
    description: 'For items that need to be carried up/down multiple flights of stairs'
  },
  SAME_DAY_SERVICE: {
    name: 'Same-Day Service',
    fee: 50,
    description: 'For urgent removal needs with short notice'
  }
};

export async function POST(request: Request) {
  try {
    const { textDescription } = await request.json();

    if (!textDescription) {
      return NextResponse.json(
        { error: 'No text description provided' },
        { status: 400 }
      );
    }

    // Prepare the system message with detailed pricing and analysis instructions
    const systemMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "system",
      content: `You are an expert in junk removal and hauling services. Analyze the customer's description and provide a detailed estimate based on the following pricing model:

Pricing Tiers:
${Object.entries(PRICING_TIERS).map(([, tier]) => `
- ${tier.name} ($${tier.range.min} - $${tier.range.max})
  Description: ${tier.description}
  Examples: ${tier.examples.join(', ')}`).join('\n')}

Additional Fees:
${Object.entries(ADDITIONAL_FEES).map(([, fee]) => `
- ${fee.name}: +$${fee.fee}
  ${fee.description}`).join('\n')}

Analysis Instructions:
1. Determine the appropriate load size based on the description and examples
2. Identify any additional fees that apply
3. Consider these factors in your analysis:
   - Volume of items
   - Weight and size of individual items
   - Number of large appliances
   - Presence of stairs or difficult access
   - Urgency of service
   - Special handling requirements
4. Calculate the total estimate by:
   - Starting with the base price for the load size
   - Adding applicable additional fees
   - Adjusting for any special circumstances

Format your response as a JSON object with these fields:
{
  "description": "Detailed explanation of the estimate calculation",
  "estimatedAmount": number,
  "breakdown": {
    "loadSize": "Selected load size tier",
    "basePrice": number,
    "additionalFees": [
      {
        "name": "Fee name",
        "amount": number,
        "reason": "Why this fee applies"
      }
    ],
    "total": number
  }
}`
    };

    // Prepare the user message
    const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "user",
      content: textDescription
    };

    // Make the API call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional junk removal estimator. Analyze the provided information and give a detailed estimate.'
          },
          {
            role: 'user',
            content: textDescription
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const content = await response.json();
    if (!content.choices || content.choices.length === 0 || !content.choices[0].message) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const estimateResponse = JSON.parse(content.choices[0].message.content);
      if (!estimateResponse.description || !estimateResponse.estimatedAmount || !estimateResponse.breakdown) {
        throw new Error('Invalid response format from OpenAI');
      }

      return NextResponse.json({
        analysis: estimateResponse.description,
        estimatedAmount: estimateResponse.estimatedAmount,
        breakdown: estimateResponse.breakdown
      });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Invalid response format from OpenAI');
    }
  } catch (error) {
    console.error('Error analyzing estimate:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze estimate' },
      { status: 500 }
    );
  }
} 