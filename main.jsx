import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, FolderHeart, Mail, CheckCircle2, ChevronRight,
  Phone, Send, MapPin, ArrowRight, Sun, Moon, ShieldCheck
} from 'lucide-react';
import './style.css'; // Assuming you still have this for tailwind or custom styles

const BRAND = {
  blue: '#00338D',
  yellow: '#EBB700',
  gray: '#55565A',
  lightGray: '#F6F8FB'
};

const ASSETS = {
  lionsEmblem: "/icons/lions-emblem.png",
  leoLogo: "/icons/leo-logo.png",
  causes: {
    diabetes: "/icons/cause-diabetes.png",
    environment: "/icons/cause-environment.png",
    hunger: "/icons/cause-hunger.png",
    vision: "/icons/cause-vision.png",
    childhoodCancer: "/icons/cause-childhood-cancer.png",
    disasterRelief: "/icons/cause-disaster-relief.png",
    youth: "/icons/cause-youth.png",
    humanitarianEfforts: "/icons/cause-humanitarian-efforts.png",
  },
};

/* =========================================================================
   COMPONENTS
   ========================================================================= */

const NavBar = ({ currentView, isDarkTheme, setIsDarkTheme, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <nav className={`sticky top-0 z-50 border-b-4 border-[#EBB700] shadow-sm transition-colors duration-200 ${isDarkTheme ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20">
        <a href="#home" className="flex items-center gap-4 cursor-pointer">
          <div className="flex items-center gap-3 py-2" aria-label="Lions International and Leo Club logos">
            <img src={ASSETS.lionsEmblem} alt="Lions International emblem" className="w-11 h-11 object-contain" />
            <img src={ASSETS.leoLogo} alt="Leo Club emblem" className="w-11 h-11 object-contain" />
          </div>
          <div className="hidden sm:block border-l border-[#B3B2B1] pl-4">
            <h1 className={`font-bold text-lg leading-tight ${isDarkTheme ? "text-white" : "text-[#00338D]"}`}>Leo Club Chandigarh Fortune</h1>
            <p className="text-xs text-[#55565A] font-medium tracking-[0.18em] uppercase">We Serve</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          <a href="#home" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'home'
            ? isDarkTheme ? 'bg-[#00338D] text-white' : 'bg-blue-50 text-[#00338D]'
            : isDarkTheme ? 'text-white hover:bg-[#EBB700] hover:text-[#172033]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#00338D]'
            }`}>Home</a>
          <a href="#projects" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'projects'
            ? isDarkTheme ? 'bg-[#00338D] text-white' : 'bg-blue-50 text-[#00338D]'
            : isDarkTheme ? 'text-white hover:bg-[#EBB700] hover:text-[#172033]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#00338D]'
            }`}>Projects</a>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`ml-2 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isDarkTheme ? 'border-[#EBB700] text-[#EBB700] hover:bg-[#EBB700] hover:text-[#172033]' : 'border-[#55565A] text-[#00338D] hover:bg-[#00338D] hover:text-white'
              }`}
          >
            {isDarkTheme ? <Sun size={18} className="text-[#EBB700]" /> : <Moon size={18} />}
          </button>
          
          <a href="#contact" className="ml-2 bg-[#00338D] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#EBB700] hover:text-[#172033] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 group">
            Reach Out <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-3">
          <button onClick={() => setIsDarkTheme(!isDarkTheme)} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${isDarkTheme ? 'border-[#EBB700]' : 'border-gray-300 text-gray-700'}`}>
            {isDarkTheme ? <Sun size={16} className="text-[#EBB700]" /> : <Moon size={16} />}
          </button>
          <a href="#contact" className="bg-[#00338D] text-white px-4 py-2 rounded-full font-bold text-sm inline-block transition-transform active:scale-95">
            Reach Out
          </a>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isDarkTheme ? 'text-white' : 'text-gray-600'}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {isMobileMenuOpen && (
      <div className={`md:hidden absolute w-full shadow-xl border-t ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl ${isDarkTheme ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>Home</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl ${isDarkTheme ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>Projects & Causes</a>
        </div>
      </div>
    )}
  </nav>
);

const Footer = ({ isDarkTheme }) => (
  <footer className={`${isDarkTheme ? 'bg-black text-white' : 'bg-gray-50 text-[#172033]'} pt-16 pb-8 border-t-[6px] border-[#EBB700] transition-colors duration-200`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img src={ASSETS.leoLogo} alt="Leo Club emblem" className="w-10 h-10 object-contain" />
            <span className={`font-bold text-lg ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Leo Club Chandigarh Fortune</span>
          </div>
          <p className={`text-sm leading-relaxed ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Affiliated with Lions Clubs International. Empowering youth to lead, serve, and inspire in Chandigarh and beyond.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#EBB700]">Organization</h3>
          <ul className={`space-y-3 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            <li><a href="#home" className={`transition-colors ${isDarkTheme ? 'hover:text-white' : 'hover:text-[#00338D]'}`}>About Us</a></li>
            <li><a href="#projects" className={`transition-colors ${isDarkTheme ? 'hover:text-white' : 'hover:text-[#00338D]'}`}>Global Causes</a></li>
            <li><a href="#projects" className={`transition-colors ${isDarkTheme ? 'hover:text-white' : 'hover:text-[#00338D]'}`}>Our Projects</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#EBB700]">Contact</h3>
          <ul className={`space-y-3 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            <li className="flex items-center gap-2 group"><Mail size={16} className={`transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`} /> info@leochandigarh.org</li>
            <li className="flex items-center gap-2 group"><Phone size={16} className={`transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`} /> +91 98765 43210</li>
            <li><a href="#contact" className={`transition-colors ${isDarkTheme ? 'hover:text-white' : 'hover:text-[#00338D]'}`}>Reach Out Form</a></li>
          </ul>
        </div>
      </div>
      <div className={`pt-8 border-t text-center text-sm flex flex-col md:flex-row justify-between items-center ${isDarkTheme ? 'border-gray-800 text-gray-500' : 'border-gray-300 text-gray-600'}`}>
        <p>© 2026 Leo Club Chandigarh Fortune. All rights reserved.</p>
        <p className="mt-2 md:mt-0 font-bold text-[#EBB700]">We Serve.</p>
      </div>
    </div>
  </footer>
);

const HomeView = ({ isDarkTheme }) => (
  <div className="min-h-screen">
    <style>{`
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-slide-up {
        animation: slideUpFade 0.7s ease-out forwards;
      }
      .delay-150 { animation-delay: 150ms; opacity: 0; }
    `}</style>

    {/* Hero Section */}
    <div className={`${isDarkTheme ? 'bg-black text-white' : 'bg-blue-50 text-[#172033]'} relative overflow-hidden transition-colors duration-200 border-b-4 border-[#EBB700]`}>
      <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] ${isDarkTheme ? 'from-[#00338D]' : 'from-blue-300'} via-transparent to-transparent`}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 animate-slide-up">
        <div className="max-w-3xl">
          <span className="text-[#EBB700] font-bold tracking-widest uppercase text-sm mb-4 block flex items-center gap-2">
            <ShieldCheck size={18} /> Lions Clubs International
          </span>
          <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>
            Serve. Lead.<br />
            <span className="text-[#EBB700]">Inspire.</span>
          </h1>
          <p className={`mt-4 text-xl max-w-2xl leading-relaxed ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
            We have more volunteers in more places than any other service organization in the world. Join Chandigarh's premier youth leadership movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="#contact" className="bg-[#EBB700] text-[#172033] hover:bg-[#00338D] hover:text-white transition-all duration-300 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 w-fit hover:-translate-y-1 hover:shadow-xl group">
              Reach Out <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Global Causes Section */}
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${isDarkTheme ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="text-center mb-16 animate-slide-up delay-150">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Our Global Causes</h2>
        <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-6"></div>
        <p className={`max-w-2xl mx-auto text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Lions and Leos are united globally around the largest challenges facing humanity.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-slide-up delay-150">
        {[
          { name: "Vision", icon: ASSETS.causes.vision },
          { name: "Hunger", icon: ASSETS.causes.hunger },
          { name: "Diabetes", icon: ASSETS.causes.diabetes },
          { name: "Childhood Cancer", icon: ASSETS.causes.childhoodCancer },
          { name: "Environment", icon: ASSETS.causes.environment },
          { name: "Disaster Relief", icon: ASSETS.causes.disasterRelief },
          { name: "Youth", icon: ASSETS.causes.youth },
          { name: "Humanitarian Efforts", icon: ASSETS.causes.humanitarianEfforts }
        ].map((cause, idx) => (
          <a href="#projects" key={idx} className={`block ${isDarkTheme ? 'bg-[#1E1E1E] border-[#333] hover:border-[#EBB700]' : 'bg-white border-gray-200 hover:border-[#00338D] hover:shadow-md'} rounded-2xl p-6 border flex flex-col items-center text-center transition-all cursor-pointer hover:-translate-y-1`}>
            <img src={cause.icon} alt="" className="w-16 h-16 object-contain mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>{cause.name}</h3>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsView = ({ isDarkTheme }) => {
  const [filter, setFilter] = useState('All');

  const allProjects = [
    { date: "AUG 2026", status: "UPCOMING", title: "Blood Donation Camp", loc: "Chandigarh University Campus", color: "text-blue-500" },
    { date: "SEP 2026", status: "UPCOMING", title: "Tree Plantation Drive", loc: "Sector 42, Chandigarh", color: "text-green-500" },
    { date: "JUN 2026", status: "COMPLETED", title: "Free Eye Checkup", loc: "Sector 17 Community Hall", color: "text-purple-500" }
  ];

  const filteredProjects = filter === 'All' ? allProjects : allProjects.filter(p => p.status === filter);

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in {
          animation: popIn 0.4s ease-out forwards;
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.6s ease-out forwards;
        }
      `}</style>

      <section className={`${isDarkTheme ? 'bg-black text-white' : 'bg-blue-50 text-[#172033]'} border-b-4 border-[#EBB700] relative overflow-hidden transition-colors duration-200`}>
        <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] ${isDarkTheme ? 'from-[#00338D]' : 'from-blue-300'} via-transparent to-transparent`}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 animate-slide-up">
          <p className="text-[#EBB700] font-bold tracking-[0.18em] uppercase text-sm mb-4">OUR INITIATIVES</p>
          <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Projects & Causes</h1>
          <p className={`text-xl max-w-3xl leading-relaxed ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
            Explore the initiatives through which Leo Club Chandigarh Fortune creates lasting impact across our community. From humanitarian service and youth leadership to environmental sustainability and global causes, every project reflects our commitment to <span className="text-[#EBB700] font-semibold">We Serve.</span>
          </p>
        </div>
      </section>

      <section className={`${isDarkTheme ? 'bg-[#121212]' : 'bg-white'} py-16 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Recent & Upcoming Projects</h2>
            <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-8"></div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setFilter('All')}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 ${filter === 'All'
                  ? 'bg-[#00338D] text-white shadow-md'
                  : isDarkTheme ? 'border border-gray-500 text-white hover:bg-[#2A2A2A]' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('UPCOMING')}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 ${filter === 'UPCOMING'
                  ? 'bg-[#00338D] text-white shadow-md'
                  : isDarkTheme ? 'border border-gray-500 text-white hover:bg-[#2A2A2A]' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Upcoming
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6" key={filter}>
            {filteredProjects.map((proj, i) => (
              <div
                key={proj.title}
                className={`animate-pop-in ${isDarkTheme ? 'bg-[#1E1E1E] border-[#333] hover:border-[#EBB700]' : 'bg-white border-gray-200 hover:border-[#00338D] hover:shadow-xl'} rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2`}
                style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                <div className={`h-44 flex items-center justify-center ${isDarkTheme ? 'bg-[#2A2A2A]' : 'bg-blue-50'}`}>
                  <FolderHeart className={isDarkTheme ? 'text-gray-500' : 'text-blue-200'} size={48} />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 text-xs font-bold mb-3">
                    <span className={proj.status === 'COMPLETED' && !isDarkTheme ? 'text-gray-500' : proj.color}>{proj.date}</span>
                    <span className={isDarkTheme ? 'text-gray-500' : 'text-gray-300'}>•</span>
                    <span className={proj.status === 'COMPLETED' ? 'text-green-600' : 'text-[#EBB700]'}>{proj.status}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>{proj.title}</h3>
                  <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>{proj.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactView = ({ isDarkTheme }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-[#121212]' : 'bg-white'}`}>

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 100ms; opacity: 0; }
        .delay-200 { animation-delay: 200ms; opacity: 0; }
      `}</style>

      <section className={`${isDarkTheme ? 'bg-black text-white' : 'bg-blue-50 text-[#172033]'} border-b-4 border-[#EBB700] transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 animate-slide-up">
          <p className="font-sans text-[#EBB700] font-bold tracking-[0.18em] uppercase text-sm mb-4">Get in touch</p>
          <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-5 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Let’s serve together.</h1>
          <p className={`text-lg max-w-2xl ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Reach out for general inquiries, club information, or service partnerships. Fill out the form below and we’ll get back to you.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
        <aside className="border-l-4 border-[#EBB700] pl-6 self-start animate-slide-up delay-100">
          <h2 className={`text-2xl font-bold mb-5 ${isDarkTheme ? "text-white" : "text-[#00338D]"}`}>Leo Club Chandigarh Fortune</h2>
          <div className={`space-y-5 ${isDarkTheme ? 'text-gray-400' : 'text-[#55565A]'}`}>
            <p className="flex items-start gap-3 group cursor-default"><Mail className={`shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`} size={19} /><span><strong className={`font-sans block ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Email</strong>info@leochandigarh.org</span></p>
            <p className="flex items-start gap-3 group cursor-default"><Phone className={`shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`} size={19} /><span><strong className={`font-sans block ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Phone</strong>+91 98765 43210</span></p>
            <p className="flex items-start gap-3 group cursor-default"><MapPin className={`shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`} size={19} /><span><strong className={`font-sans block ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Serving</strong>Chandigarh and the surrounding community</span></p>
          </div>
          <div className={`mt-10 pt-7 border-t ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
            <p className={isDarkTheme ? 'text-gray-500' : 'text-[#55565A]'}>For urgent, time-sensitive service requests, please call rather than using this form.</p>
          </div>
        </aside>

        <div
          className={`border p-7 md:p-10 transition-all duration-300 animate-slide-up delay-200 ${isDarkTheme ? 'bg-[#1E1E1E] border-[#333]' : 'bg-white border-gray-300'}`}
          style={{ boxShadow: isDarkTheme ? '8px 8px 0 #EBB700' : '8px 8px 0 #00338D' }}
        >
          {submitted ? (
            <div className="py-12 text-center animate-slide-up">
              <CheckCircle2 className="mx-auto text-[#EBB700] mb-5" size={52} />
              <h2 className={`text-3xl font-bold mb-3 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Thank you for reaching out.</h2>
              <p className={`max-w-md mx-auto ${isDarkTheme ? 'text-gray-400' : 'text-[#55565A]'}`}>Your message has been recorded. A club representative will respond soon.</p>
              <button onClick={() => setSubmitted(false)} className={`mt-8 px-6 py-3 font-bold transition-colors ${isDarkTheme ? 'bg-[#EBB700] text-black hover:bg-yellow-500' : 'bg-[#00338D] text-white hover:bg-[#172033]'}`}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-[#172033]"}`}>Contact us</h2>
                <p className={`mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-[#55565A]'}`}>Fields marked with an asterisk are required.</p>
              </div>

              {/* Name Row */}
              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>First Name *</label>
                  <input required type="text" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="First Name" />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Middle Name</label>
                  <input type="text" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="Middle Name" />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Last Name *</label>
                  <input required type="text" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="Last Name" />
                </div>
              </div>

              {/* Personal Details Row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Date of Birth *</label>
                  <input required type="date" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Gender *</label>
                  <select required defaultValue="" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option value="" disabled>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Email ID *</label>
                <input required type="email" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="name@example.com" />
              </div>

              {/* Professional/Educational Details */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Occupation *</label>
                  <input required type="text" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="Student, Engineer, etc." />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Organisation / College *</label>
                  <input required type="text" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="Institute Name" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Message / Inquiry</label>
                <textarea rows={4} className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="Tell us how we can assist you..." />
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#EBB700] text-[#172033] px-7 py-3.5 font-bold hover:bg-yellow-500 transition-colors inline-flex items-center justify-center gap-2 shadow-md">
                Send Message <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};


/* =========================================================================
   MAIN APP RENDER
   ========================================================================= */

function LeoClubApp() {
  const [currentView, setCurrentView] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    return hash || 'home';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentView(hash.split('?')[0]);
      } else {
        setCurrentView('home');
      }
      window.scrollTo(0, 0);
    };

    if (!window.location.hash) {
      window.history.replaceState(null, '', '#home');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className={isDarkTheme ? 'theme-dark min-h-screen' : 'theme-light min-h-screen'}>
      <NavBar
        currentView={currentView}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main>
        {currentView === 'home' && <HomeView isDarkTheme={isDarkTheme} />}
        {currentView === 'projects' && <ProjectsView isDarkTheme={isDarkTheme} />}
        {currentView === 'contact' && <ContactView isDarkTheme={isDarkTheme} />}
      </main>

      <Footer isDarkTheme={isDarkTheme} />
    </div>
  );
}

// Render root
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <LeoClubApp />
    </React.StrictMode>
  );
}

export default LeoClubApp;