import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const TIME_SLOTS: Record<string, string> = {
  MORNING: '09:00',
  AFTERNOON: '13:00',
  EVENING: '17:00',
};

export async function GET(request: Request) {
  try {
    const appointments = await prisma.estimate.findMany({
      where: {
        status: 'CONFIRMED',
      },
      select: {
        id: true,
        name: true,
        serviceType: true,
        preferredDate: true,
        preferredTime: true,
        address: true,
        phone: true,
        estimatedAmount: true,
      },
    });

    // Group by date and slot to stack them
    const slotCounters: Record<string, number> = {};

    const formattedAppointments = appointments
      .map((appointment) => {
        if (!appointment.preferredDate) {
          console.warn('Skipping appointment with missing date:', appointment);
          return null;
        }
        let timeStr = appointment.preferredTime;
        let slotKey = '';
        if (timeStr in TIME_SLOTS) {
          timeStr = TIME_SLOTS[timeStr];
          slotKey = `${appointment.preferredDate}_${appointment.preferredTime}`;
        } else if (/^\d{2}:\d{2}$/.test(timeStr)) {
          slotKey = `${appointment.preferredDate}_${timeStr}`;
        } else {
          // Unknown time, skip
          console.warn('Skipping appointment with unknown time:', appointment);
          return null;
        }

        // Stack: increment hour if multiple in same slot
        if (!slotCounters[slotKey]) slotCounters[slotKey] = 0;
        const hourOffset = slotCounters[slotKey];
        slotCounters[slotKey]++;

        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date(appointment.preferredDate);
        if (isNaN(date.getTime()) || isNaN(hours) || isNaN(minutes)) {
          console.warn('Skipping appointment with invalid date/time:', appointment);
          return null;
        }
        date.setHours(hours + hourOffset, minutes);
        const endDate = new Date(date);
        endDate.setHours(endDate.getHours() + 1);
        return {
          id: appointment.id,
          title: appointment.serviceType,
          start: date.toISOString(),
          end: endDate.toISOString(),
          customerName: appointment.name,
          serviceType: appointment.serviceType,
          address: appointment.address,
          phone: appointment.phone,
          estimatedAmount: appointment.estimatedAmount,
        };
      })
      .filter(Boolean);

    return NextResponse.json(formattedAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    await prisma.estimate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
} 