import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import QrImage from './assets/QrImage.jpg';

// --- Utility Icon Components (Inline SVGs for Single-File React) ---

const RocketIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.97-2 1.3-3.26ZM19.22 4.78a2 2 0 0 1 0 2.83l-10 10-2.83-2.83 10-10a2 2 0 0 1 2.83 0Z" />
    <path d="M15 11l4-4" />
  </svg>
);

const CodeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const DatabaseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TrendingUpIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const AwardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15.4 3.3l1.8.8A2 2 0 0 0 19 4.8l1.4 3.7c.6 1.6-.1 3.2-1.4 4.1l-.8.6c.5.8.5 1.8-.1 2.7l-.4.7a2 2 0 0 1-2.5 1.3l-1.8-.7a2 2 0 0 0-2.3.8l-1.4 3.7c-.6 1.6-2.2 2.3-3.7 1.7l-1.8-.7a2 2 0 0 1-1.3-2.5l.7-1.8c.8-.7 1.8-1.5.8-2.3l-.6-.8c-1.6-1.1-2.3-3.2-1.7-4.8l.7-1.8a2 2 0 0 1 2.5-1.3l1.8.7c.8.3 1.8 0 2.3-.8l1.4-3.7c.6-1.6 2.2-2.3 3.7-1.7Z" />
  </svg>
);

const SeatIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14v10l-4-4v-6c0-3 2-5 4-5l6 10-6 10c0-3 2-5 4-5l10-10-6-10z" />
    <circle cx="12" cy="7" r="3" />
  </svg>
);

const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LinkIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// --- Section Components ---

const Card = ({ title, icon: Icon, children }) => (
  <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:border-white/20 border border-transparent cursor-pointer">
    <div className="flex items-center space-x-4 mb-3">
      <div className="p-3 rounded-full bg-purple-500/50">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-200">{children}</p>
  </div>
);

const LearnCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl transition-all duration-300 transform hover:bg-white/10 flex items-start space-x-4">
    <Icon className="w-6 h-6 mt-1 text-teal-300 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </div>
);

// --- Main Components ---

const Navbar = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'What You\'ll Learn', id: 'learn' },
    { name: 'Why Join', id: 'why-join' },
    { name: 'Register', id: 'register' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 shadow-xl bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <a href="#home" className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Launchpad
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-60 opacity-100 py-2' : 'max-h-0 opacity-0'
        } bg-gray-800/90 backdrop-blur-sm`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Reusable component for section entrance animation
const AnimatedSection = ({ id, children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id={id} ref={ref} className="py-20 sm:py-28 transition-all duration-1000 ease-out">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {children}
      </div>
    </section>
  );
};

const Hero = ({ scrollToSection }) => {
  // Simple state to trigger the fade-in animation once
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Wait a brief moment for the initial load feel
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="home" className="pt-20 pb-16 sm:pt-32 sm:pb-24 min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
          {/* <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-purple-600 text-white shadow-lg">
            7 Days | Online
          </span>
          <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-teal-500 text-white shadow-lg">
            ₹80 Only!
          </span> */}
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            🚀 Build Your First Web Project
          </span>
          <br className="hidden sm:inline" /> in Just 7 Days!
        </h1>
        
        <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-gray-300 font-light leading-relaxed">
          The Full Stack Launchpad Bootcamp is your essential first step into the world of web development. Learn the fundamentals of Front-end, Back-end, and Database hands-on.
        </p>

       <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
  {/* Register Button */}
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSe2jN-xkklQFxb-Bg-TdHpdXaqZwzgl5SFJo8MbDTY_elbHWg/viewform?usp=dialog"
    target="_blank"
    rel="noopener noreferrer"
    className="group px-8 py-3 rounded-full font-bold text-lg text-white transition-all duration-300 transform shadow-lg hover:shadow-2xl hover:-translate-y-1
      bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center space-x-2"
  >
    <RocketIcon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
    <span>Register Now</span>
  </a>

  {/* QR Code Section */}
  <div className="p-4 bg-white/10 rounded-xl shadow-lg border border-purple-400/50 flex flex-col items-center">
    <img
      src={QrImage}
      alt="Registration QR Code"
      className="w-44 h-44 sm:w-52 sm:h-52 rounded-md"
    />
    <p className="mt-3 text-sm sm:text-base text-gray-300">Scan to Pay</p>
  </div>
</div>

      </div>
    </div>
  );
};

const LearnSection = () => {
  const learnItems = [
    {
      icon: CodeIcon,
      title: "Frontend Fundamentals",
      description: "Master HTML, CSS, and basic JavaScript to build stunning, responsive user interfaces."
    },
    {
      icon: DatabaseIcon,
      title: "Backend Essentials",
      description: "Understand server-side logic and APIs—the backbone of every modern web application."
    },
    {
      icon: DatabaseIcon,
      title: "Database Basics",
      description: "Learn how to store, retrieve, and manage data efficiently using essential database concepts."
    },
    {
      icon: LinkIcon,
      title: "Deployment & Hosting",
      description: "Take your project live! Learn the steps to deploy your mini-project and share it with the world."
    },
  ];

  return (
    <AnimatedSection id="learn">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        What You'll Learn
      </h2>
      <p className="text-xl text-center mb-12 text-gray-300">
        Hands-on learning tailored for 1st-year college students.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {learnItems.map((item, index) => (
          <LearnCard key={index} icon={item.icon} title={item.title} description={item.description} />
        ))}
      </div>
    </AnimatedSection>
  );
};

const WhyJoinSection = () => {
  const joinReasons = [
    {
      icon: RocketIcon,
      title: "Build & Host a Mini Project",
      description: "Finish the bootcamp with a functional project for your portfolio, ready to showcase to recruiters."
    },
    {
      icon: TrendingUpIcon,
      title: "Internship Head Start",
      description: "Gain the foundational knowledge needed to ace your first technical interviews and internships."
    },
    {
      icon: AwardIcon,
      title: "Digital Certificate",
      description: "Receive a verified digital certificate of completion to boost your resume and LinkedIn profile."
    },
    {
      icon: SeatIcon,
      title: "Limited Seats & High Value",
      description: "Only ₹80 for 7 days of intense, focused learning. Secure your spot before they run out!"
    },
  ];

  return (
    <AnimatedSection id="why-join">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-purple-400">
        Why Join Full Stack Launchpad?
      </h2>
      <p className="text-xl text-center mb-12 text-gray-300">
        Invest 7 days for a major leap in your technical career.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {joinReasons.map((reason, index) => (
          <Card key={index} icon={reason.icon} title={reason.title}>
            {reason.description}
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
};

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 py-10 border-t border-gray-700/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div className="space-y-3">
          <h4 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Launchpad Bootcamp
          </h4>
          <p className="text-sm">Kickstart your coding journey with practical, project-based learning.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-semibold text-white mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => document.getElementById('learn').scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">What You'll Learn</button></li>
            <li><button onClick={() => document.getElementById('why-join').scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">Why Join</button></li>
            <li><a href="#home" className="hover:text-purple-400 transition-colors">Register</a></li>
          </ul>
        </div>

        {/* Contact/Social */}
        <div>
          <h5 className="font-semibold text-white mb-3">Connect</h5>
          <p className="text-sm">Mode: Online (Google Meet)</p>
          <p className="text-sm">Fee: ₹80 Only</p>
          <div className="flex space-x-4 mt-3">
            {/* Placeholder for Social Icons */}
            <UserIcon className="w-5 h-5 hover:text-white transition-colors cursor-pointer" title="Social Link 1" />
            <CodeIcon className="w-5 h-5 hover:text-white transition-colors cursor-pointer" title="Social Link 2" />
            <RocketIcon className="w-5 h-5 hover:text-white transition-colors cursor-pointer" title="Social Link 3" />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
        &copy; {new Date().getFullYear()} Full Stack Launchpad Bootcamp. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  // Function to smoothly scroll to a section
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by the fixed navbar height (e.g., 64px or h-16)
      const yOffset = -64; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Navbar scrollToSection={scrollToSection} />
      
      <main>
        <Hero scrollToSection={scrollToSection} />
        <LearnSection />
        <WhyJoinSection />

        {/* Registration Anchor */}
        <div id="register" className="h-0 pt-10 sm:pt-16"></div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
