import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import ServiceAreas from './components/ServiceAreas';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <ServiceAreas />
      <Testimonials />
      <CallToAction />
    </>
  );
} 