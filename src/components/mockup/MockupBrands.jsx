import React from 'react';

export default function MockupBrands() {
  const brands = [
    { name: 'MICHELIN', className: 'brand-michelin' },
    { name: 'BRIDGESTONE', className: 'brand-bridgestone' },
    { name: 'Continental', className: 'brand-continental' },
    { name: 'IRELLI', prefix: 'P', className: 'brand-pirelli' },
    { name: 'apollo', suffix: 'TYRES', className: 'brand-apollo' },
    { name: 'MRF', className: 'brand-mrf' }
  ];

  return (
    <section className="mockup-brands-strip" id="partners">
      <div className="mockup-container">
        <h4 className="brands-strip-title">TOP BRANDS. TRUSTED BY MILLIONS.</h4>
        
        <div className="brands-logos-flex">
          {brands.map((b, idx) => (
            <div key={idx} className={`brand-text-logo ${b.className}`}>
              {b.prefix && <span style={{ color: '#FF2B85' }}>{b.prefix}</span>}
              {b.name}
              {b.suffix && <span style={{ fontSize: '0.65rem', marginLeft: '4px', verticalAlign: 'middle', color: '#94A3B8' }}>{b.suffix}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
