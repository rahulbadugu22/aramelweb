import React from 'react';
import { 
  Sparkles, 
  Disc, 
  Wrench, 
  QrCode, 
  ArrowRight 
} from 'lucide-react';

export default function MockupServices({ onOpenScanner, onSelectService }) {
  const services = [
    {
      id: 'car-wash',
      title: 'Car Wash & Detailing',
      image: '/mockup/service_car_wash.jpg',
      icon: <Sparkles size={18} />,
      items: [
        'Car Wash, Foam Wash',
        'Interior Detailing',
        'Ceramic Coating',
        'Doorstep Car Wash',
        'Express Care'
      ],
      linkText: 'Explore Car Care',
      href: '#services'
    },
    {
      id: 'tyres',
      title: 'Tyres & Fitment',
      image: '/mockup/service_tyres.jpg',
      icon: <Disc size={18} />,
      items: [
        'Tyres by Size or Vehicle',
        'Top Brands',
        'Doorstep Fitment',
        'Wheel Balancing',
        'Alignment & Disposal'
      ],
      linkText: 'Explore Tyres',
      href: '#services'
    },
    {
      id: 'vehicle-services',
      title: 'Vehicle Services',
      image: '/mockup/service_mechanic.jpg',
      icon: <Wrench size={18} />,
      items: [
        'General Service',
        'Periodic Maintenance',
        'Pickup & Drop',
        'Genuine Parts',
        'Live Tracking'
      ],
      linkText: 'Book a Service',
      href: '#services'
    },
    {
      id: 'find-owner',
      title: 'Find Owner',
      image: '/mockup/service_find_owner.jpg',
      icon: <QrCode size={18} />,
      items: [
        'QR/NFC Smart Tags',
        'Privacy Protected Calls',
        'Preset Alerts',
        'Emergency Communication',
        'Secure & Reliable'
      ],
      linkText: 'Discover Find Owner',
      href: '#find-owner',
      isScanner: true
    }
  ];

  return (
    <section className="mockup-services" id="services">
      <div className="mockup-container">
        <div className="services-sec-header">
          <span className="services-tag">OUR SERVICES</span>
          <h2 className="services-heading">
            Everything You Need. <span className="pink-accent">One App.</span>
          </h2>
        </div>

        <div className="services-grid-4">
          {services.map((service) => (
            <div key={service.id} className="mockup-service-card">
              <div className="service-card-media">
                <img src={service.image} alt={service.title} />
                <div className="service-card-badge">
                  {service.icon}
                </div>
              </div>

              <div className="service-card-body">
                <h3 className="service-card-title">{service.title}</h3>
                
                <ul className="service-card-list">
                  {service.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <a 
                  href={service.href} 
                  onClick={service.isScanner ? (e) => { e.preventDefault(); onOpenScanner?.(); } : undefined}
                  className="service-card-link"
                >
                  {service.linkText}
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
