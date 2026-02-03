'use client';

export default function ProductStats() {
  const stats = [
    {
      id: 1,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 26C40 36 33 41 24.68 43.9C24.2443 44.0477 23.7711 44.0406 23.34 43.88C15 41 8 36 8 26V12C8 11.4696 8.21071 10.9609 8.58579 10.5858C8.96086 10.2108 9.46957 10 10 10C14 10 19 7.60004 22.48 4.56004C22.9037 4.19804 23.4427 3.99915 24 3.99915C24.5573 3.99915 25.0963 4.19804 25.52 4.56004C29.02 7.62004 34 10 38 10C38.5304 10 39.0391 10.2108 39.4142 10.5858C39.7893 10.9609 40 11.4696 40 12V26Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: '15+',
      label: 'Years of Excellence',
    },
    {
      id: 2,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.9535 25.78L33.9835 42.832C34.0174 43.0328 33.9893 43.2392 33.9028 43.4235C33.8162 43.6079 33.6755 43.7614 33.4994 43.8636C33.3232 43.9658 33.1201 44.0118 32.9171 43.9954C32.7141 43.9791 32.521 43.9011 32.3635 43.772L25.2035 38.398C24.8579 38.1398 24.438 38.0003 24.0065 38.0003C23.575 38.0003 23.1552 38.1398 22.8095 38.398L15.6375 43.77C15.4801 43.8989 15.2872 43.9767 15.0845 43.9931C14.8818 44.0095 14.6788 43.9637 14.5028 43.8618C14.3268 43.7598 14.1861 43.6067 14.0993 43.4227C14.0126 43.2387 13.9841 43.0327 14.0175 42.832L17.0455 25.78" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 28C30.6274 28 36 22.6274 36 16C36 9.37258 30.6274 4 24 4C17.3726 4 12 9.37258 12 16C12 22.6274 17.3726 28 24 28Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: '1000+',
      label: 'Projects Completed',
    },
    {
      id: 3,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 12V24L32 28" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: '24/7',
      label: 'Customer Support',
    }
  ];

  return (
    <section className="w-full pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="rounded-2xl px-8 py-12 flex flex-col items-center justify-center text-center text-white transition-transform hover:-translate-y-1 duration-300 w-full max-w-[340px] mx-auto"
              style={{ 
                background: 'linear-gradient(180deg, #C83C64 0%, #D46D64 100%)',
                boxShadow: '0 10px 30px -10px rgba(200, 60, 100, 0.3)'
              }}
            >
              <div className="mb-4 transform scale-125">
                {stat.icon}
              </div>
              <h2 className="text-[32px] font-medium mb-2 font-lato">{stat.value}</h2>
              <p className="text-[14px] font-normal font-lato opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
