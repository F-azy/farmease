import React, { useState, useEffect } from 'react';

const FarmLearnLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({
    farmers: 0,
    modules: 0,
    success: 0,
    products: 0
  });

  // Counter animation effect
  useEffect(() => {
    const targets = {
      farmers: 50000,
      modules: 200,
      success: 95,
      products: 500
    };

    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key];
      const increment = target / 100;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, 20);
    });
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[id]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .gradient-bg {
          background: linear-gradient(135deg, #10b981 0%, #059669 25%, #047857 75%, #065f46 100%);
          position: relative;
          overflow: hidden;
        }
        
        .gradient-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="40" cy="80" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes floatCards {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .logo-bounce {
          animation: bounce 2s infinite;
        }
        
        .float-cards {
          animation: floatCards 3s ease-in-out infinite alternate;
        }
        
        .floating-icon {
          position: absolute;
          font-size: 2rem;
          opacity: 0.1;
          animation: floatIcon 6s ease-in-out infinite;
        }
        
        .floating-icon:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .floating-icon:nth-child(2) {
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }
        
        .floating-icon:nth-child(3) {
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }
        
        .glassmorphism {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glassmorphism-hover:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-5px);
        }
        
        .text-gradient {
          background: linear-gradient(45deg, #ffffff, #f0fdf4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-primary {
          background: linear-gradient(45deg, #10b981, #059669);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.6);
        }
        
        .btn-secondary {
          background: linear-gradient(45deg, #6b7280, #4b5563);
          box-shadow: 0 10px 30px rgba(107, 114, 128, 0.4);
        }
        
        .btn-secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(107, 114, 128, 0.6);
        }
        
        .feature-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .feature-shine:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Hero Section with Green Gradient Background */}
      <div className="gradient-bg relative">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-icon">🌾</div>
          <div className="floating-icon">🐟</div>
          <div className="floating-icon">🐓</div>
        </div>

        {/* Header */}
        <header className="absolute w-full top-0 z-50 p-5">
          <div className="max-w-6xl mx-auto">
            <nav className="flex justify-between items-center">
              {/* Logo */}
              <a href="#" className="flex items-center gap-3 text-white text-3xl font-black">
                <span className="logo-bounce text-4xl">🌱</span>
                FarmEase
              </a>

              {/* Desktop Navigation */}
              <ul className="hidden md:flex items-center gap-6">
                {['Features', 'About', 'Marketplace', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                      className="text-white font-medium hover:transform hover:-translate-y-1 transition-all duration-300 relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
                
                {/* Auth Buttons */}
                <li>
                  <a href="login"><button className="glassmorphism px-4 py-2 rounded-full text-white font-semibold hover:bg-white hover:bg-opacity-20 transform hover:-translate-y-1 transition-all duration-300 text-sm">
                    Login
                  </button></a>
                </li>
                <li>
                 <a href="signup"> <button className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-black font-semibold hover:bg-opacity-30 transform hover:-translate-y-1 transition-all duration-300 text-sm">
                    Sign Up
                  </button></a>
                </li>
                <li>
               <a href="adminlogin">   <button className="bg-green-700 px-4 py-2 rounded-full text-white font-semibold hover:bg-green-800 transform hover:-translate-y-1 transition-all duration-300 text-sm">
                    Admin Login
                  </button></a>
                </li>
              </ul>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white text-2xl"
              >
                ☰
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Content */}
        <section className="min-h-screen flex items-center relative z-10 pt-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient leading-tight">
                  Learn, Grow, Earn with Smart Farming
                </h1>
                <p className="text-xl mb-8 opacity-90 font-light">
                  Master modern farming techniques through gamified learning. Complete tasks, earn rewards, and transform your agricultural journey with our comprehensive platform.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <button className="btn-primary px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3">
                    <span>🚀</span>
                    Start Learning
                  </button>
                  <button className="glassmorphism px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-white hover:bg-opacity-20 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                    <span>📖</span>
                    View Demo
                  </button>
                </div>
              </div>

              {/* Right Content - Feature Cards */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-5 float-cards">
                  {[
                    { icon: '🌱', title: 'Crop Management', desc: 'Learn sustainable farming practices' },
                    { icon: '🐟', title: 'Pisciculture', desc: 'Master fish farming techniques' },
                    { icon: '🐓', title: 'Poultry', desc: 'Optimize poultry management' },
                    { icon: '🏆', title: 'Rewards', desc: 'Earn points for achievements' }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="glassmorphism rounded-2xl p-6 text-center text-white glassmorphism-hover transition-all duration-300"
                    >
                      <span className="text-4xl mb-4 block">{feature.icon}</span>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm opacity-80">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Stats Section */}
      <section className="bg-white py-20" id="stats">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { key: 'farmers', label: 'Active Farmers', suffix: 'K+', color: 'from-green-400 to-green-600' },
              { key: 'modules', label: 'Learning Modules', suffix: '+', color: 'from-emerald-400 to-emerald-600' },
              { key: 'success', label: 'Success Rate', suffix: '%', color: 'from-teal-400 to-teal-600' },
              { key: 'products', label: 'Products Available', suffix: '+', color: 'from-green-500 to-green-700' }
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${stat.color} rounded-2xl p-8 text-center text-white transform hover:-translate-y-3 transition-all duration-300 shadow-lg`}
              >
                <span className="text-4xl font-black block mb-2">
                  {stat.key === 'farmers' ? Math.floor(counters[stat.key] / 1000) : counters[stat.key]}{stat.suffix}
                </span>
                <span className="text-lg font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="gradient-bg py-24" id="features">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-5xl font-black text-center mb-16 text-gradient">
            Powerful Features for Modern Farmers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: '🎮', title: 'Gamified Learning', desc: 'Complete step-by-step tasks, upload progress photos, and unlock new levels as you master farming techniques.' },
              { icon: '🏪', title: 'Reward Marketplace', desc: 'Redeem earned points for farming equipment, seeds, and supplies at subsidized prices from verified sellers.' },
              { icon: '📋', title: 'Government Forms', desc: 'Easy access to subsidy applications and government schemes with direct connection to panchayat officials.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Access all features on your smartphone with offline capabilities for areas with poor connectivity.' },
              { icon: '🌍', title: 'Local Language', desc: 'Interface available in Malayalam, Hindi, and other regional languages for better accessibility.' },
              { icon: '📊', title: 'Analytics Dashboard', desc: 'Track your progress, view earnings, and get insights about your farming journey and achievements.' }
            ].map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                className={`glassmorphism rounded-3xl p-8 text-center text-white feature-shine relative overflow-hidden transform transition-all duration-500 ${
                  isVisible[`feature-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } hover:-translate-y-3 hover:bg-white hover:bg-opacity-15 shadow-xl`}
              >
                <span className="text-6xl mb-6 block">{feature.icon}</span>
                <h3 className="text-2xl font-bold mb-5">{feature.title}</h3>
                <p className="opacity-90 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24" id="cta">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join thousands of farmers who are already learning and earning through our platform. Start your journey towards sustainable and profitable farming today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="btn-primary px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3">
              <span>🌱</span>
              Register as Farmer
            </button>
            <button className="btn-secondary px-8 py-4 rounded-full text-white font-semibold text-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
              <span>👨‍💼</span>
              Admin Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-lg">
            © 2024 FarmLearn. Built for Smart India Hackathon. Empowering farmers through technology.
          </p>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed top-0 right-0 h-full w-64 bg-white p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 text-2xl"
            >
              ✕
            </button>
            <nav className="mt-12">
              <ul className="space-y-6">
                {['Features', 'About', 'Marketplace', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => {
                        handleSmoothScroll(e, item.toLowerCase());
                        setIsMenuOpen(false);
                      }}
                      className="block text-gray-800 font-medium text-lg hover:text-green-600"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                
                {/* Auth Buttons in Mobile Menu */}
                <li>
                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-full font-semibold mb-2">
                    Login
                  </button>
                </li>
                <li>
                  <button className="w-full border-2 border-green-600  text-green-600 px-6 py-3 rounded-full font-semibold mb-2">
                    Sign Up
                  </button>
                </li>
                <li>
                  <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-full font-semibold">
                    Admin Login
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmLearnLanding;