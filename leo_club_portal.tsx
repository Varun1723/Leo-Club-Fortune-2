import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import MemberPortalApp from './member_portal';
import AdminPortalApp from './admin_portal';
import { isValidPhoneNumber } from 'libphonenumber-js';
import {
  Menu, X, Home, Info, FolderHeart, UserPlus,
  RefreshCw, Mail, CheckCircle2, ChevronRight,
  UploadCloud, CreditCard, ShieldCheck, HeartPulse,
  Leaf, Eye, Utensils, Baby, ShieldAlert, ArrowRight,
  Users, Phone, Send, MapPin, LayoutDashboard, Sun, Moon,
  LogOut, IndianRupee, LogIn
} from 'lucide-react';

const BRAND = {
  blue: '#00338D',
  yellow: '#EBB700',
  gray: '#55565A',
  lightGray: '#F6F8FB'
};

const FEES = {
  regular: 719,
  fellowship: 1149,
  elite: 2199,
  generalRenewal: 650,
  boardRenewal: 1000
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

const NavBar = ({ session, currentView, isDarkTheme, setIsDarkTheme, isMobileMenuOpen, setIsMobileMenuOpen }) => (
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
          <a href="#contact" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'contact'
            ? isDarkTheme ? 'bg-[#00338D] text-white' : 'bg-blue-50 text-[#00338D]'
            : isDarkTheme ? 'text-white hover:bg-[#EBB700] hover:text-[#172033]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#00338D]'
            }`}>Contact</a>
          <a href="#admin-login" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'admin-login' || currentView === 'admin'
            ? isDarkTheme ? 'bg-[#00338D] text-white' : 'bg-blue-50 text-[#00338D]'
            : isDarkTheme ? 'text-white hover:bg-[#EBB700] hover:text-[#172033]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#00338D]'
            }`}>Admin</a>

          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`ml-2 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isDarkTheme ? 'border-[#EBB700] text-[#EBB700] hover:bg-[#EBB700] hover:text-[#172033]' : 'border-[#55565A] text-[#00338D] hover:bg-[#00338D] hover:text-white'
              }`}
          >
            {isDarkTheme ? <Sun size={18} className="text-[#EBB700]" /> : <Moon size={18} />}
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {session ? (
            <div className="flex items-center gap-2 ml-2">
              <button onClick={async () => { await supabase.auth.signOut(); window.location.hash = 'home'; }} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isDarkTheme ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'}`} title="Sign Out">
                <LogOut size={18} />
              </button>
              <a href="#member" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isDarkTheme ? 'text-white hover:bg-[#00338D]' : 'text-gray-600 hover:bg-gray-100 hover:text-[#00338D]'}`}>
                Portal
              </a>
              <a href="#join" className="bg-[#EBB700] text-[#172033] px-6 py-2.5 rounded-full font-bold hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 group">
                Apply <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
              </a>
            </div>
          ) : (
            <a href="#join" className="ml-2 bg-[#00338D] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#EBB700] hover:text-[#172033] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 group">
              Join Leo <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-3">
          <button onClick={() => setIsDarkTheme(!isDarkTheme)} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${isDarkTheme ? 'border-[#EBB700]' : 'border-gray-300 text-gray-700'}`}>
            {isDarkTheme ? <Sun size={16} className="text-[#EBB700]" /> : <Moon size={16} />}
          </button>
          <a href="#join" className="bg-[#00338D] text-white px-4 py-2 rounded-full font-bold text-sm inline-block transition-transform active:scale-95">
            {session ? 'Apply' : 'Join'}
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
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl ${isDarkTheme ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>Contact Us</a>
          <div className={`h-px w-full my-2 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
          <a href="#admin-login" onClick={() => setIsMobileMenuOpen(false)} className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl ${isDarkTheme ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}>Admin Portal</a>
          {session ? (
            <div className="mt-8 flex flex-col gap-3">
              <a href="#member" onClick={() => setIsMobileMenuOpen(false)} className={`w-full py-4 text-center rounded-xl font-bold border-2 transition-colors ${isDarkTheme ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                Member Portal
              </a>
              <a href="#join" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-[#00338D] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                Apply Now <ChevronRight size={18} />
              </a>
              <button onClick={async () => { await supabase.auth.signOut(); setIsMobileMenuOpen(false); window.location.hash = 'home'; }} className="w-full mt-4 flex items-center justify-center gap-2 text-red-500 font-bold py-3 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          ) : (
            <a href="#join" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center mt-4 bg-[#00338D] text-white py-3 rounded-xl font-bold">
              Join Now
            </a>
          )}
        </div>
      </div>
    )}
  </nav>
);

const Footer = ({ isDarkTheme }) => (
  <footer className={`${isDarkTheme ? 'bg-black text-white' : 'bg-gray-50 text-[#172033]'} pt-16 pb-8 border-t-[6px] border-[#EBB700] transition-colors duration-200`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
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
          <h3 className="font-bold text-lg mb-4 text-[#EBB700]">Membership</h3>
          <ul className={`space-y-3 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            <li><a href="#join" className={`transition-colors ${isDarkTheme ? 'hover:text-white' : 'hover:text-[#00338D]'}`}>Join as New Member</a></li>
            <li><a href="#contact" className={`transition-colors ${isDarkTheme ? 'hover:text-white' : 'hover:text-[#00338D]'}`}>Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#EBB700]">Contact</h3>
          <ul className={`space-y-3 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            <li className="flex items-center gap-2 group"><Mail size={16} className={`transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`} /> info@leochandigarh.org</li>
            <li className="flex items-center gap-2 group"><Phone size={16} className={`transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`} /> +91 98765 43210</li>
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

const AuthView = ({ isDarkTheme }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      console.error("Authentication error:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-200 ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.6s ease-out forwards;
        }
      `}</style>

      <div className={`w-full max-w-md rounded-3xl shadow-2xl border p-8 sm:p-10 animate-slide-up ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <img src={ASSETS.leoLogo} alt="Leo Club emblem" className="w-full h-full object-contain drop-shadow-md" />
        </div>
        <h1 className={`text-3xl font-bold text-center mb-3 tracking-tight ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Welcome to Leo</h1>
        <p className={`text-center text-sm mb-8 leading-relaxed ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
          Sign in to start your membership application, track your status, and access your member dashboard.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 border shadow-sm hover:-translate-y-1 hover:shadow-md ${isDarkTheme
            ? 'bg-[#2A2A2A] border-gray-700 text-white hover:border-gray-500'
            : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400'
            }`}
        >
          {isLoading ? (
            <span className="animate-pulse">Connecting securely...</span>
          ) : (
            <>
              {/* Minimalist Google 'G' SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
            By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

const HomeView = ({ session, isDarkTheme }) => (
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
            <a href="#join" className="bg-[#EBB700] text-[#172033] hover:bg-[#00338D] hover:text-white transition-all duration-300 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 w-fit hover:-translate-y-1 hover:shadow-xl group">
              {session ? "Apply Now" : "Join the Club"} <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
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
          <p className={`text-lg max-w-2xl ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Reach out for membership, service partnerships, project ideas or club information. We’ll connect you with the right member of our team.</p>
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
              <div><h2 className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-[#172033]"}`}>Contact us</h2><p className={`mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-[#55565A]'}`}>Fields marked with an asterisk are required.</p></div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Full name *</label><input required type="text" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="Your name" /></div>
                <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Phone number *</label><input required type="tel" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="+91" /></div>
              </div>
              <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Email address *</label><input required type="email" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="name@example.com" /></div>
              <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>How can we help? *</label><select required defaultValue="" className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}><option value="" disabled>Select a topic</option><option>Membership inquiry</option><option>Project or service partnership</option><option>Volunteer opportunity</option><option>General question</option></select></div>
              <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-[#172033]'}`}>Message *</label><textarea required rows={5} className={`w-full border px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md focus:ring-2 focus:ring-[#EBB700] ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} placeholder="Tell us a little more about your inquiry." /></div>
              <button type="submit" className="w-full sm:w-auto bg-[#EBB700] text-[#172033] px-7 py-3.5 font-bold hover:bg-yellow-500 transition-colors inline-flex items-center justify-center gap-2 shadow-md">Send message <Send size={18} /></button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

const JoinView = ({ currentView, isDarkTheme, session }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const [countries, setCountries] = useState([]);

  const [phoneCountry, setPhoneCountry] = useState({
    name: 'India',
    dial_code: '+91',
    code: 'IN'
  });

  const [phoneNumber, setPhoneNumber] = useState('');

  const [emergencyCountry, setEmergencyCountry] = useState({
    name: 'India',
    dial_code: '+91',
    code: 'IN'
  });

  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [hasReference, setHasReference] = useState('No');
  const [referenceName, setReferenceName] = useState('');

  // Handle auto-fill from Google OAuth
  useEffect(() => {
    if (session?.user) {
      const meta = session.user.user_metadata || {};
      const fName = meta.full_name || meta.name || '';
      const parts = fName.split(' ');

      if (!firstName && parts.length > 0) setFirstName(parts[0]);
      if (!lastName && parts.length > 1) setLastName(parts.slice(1).join(' '));
      if (!email && session.user.email) setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch('/data/countries.json');

        if (!response.ok) {
          throw new Error('Failed to load country codes');
        }

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error loading country codes:', error);
      }
    };

    loadCountries();
  }, []);

  // Handle direct navigation to form without plan
  useEffect(() => {
    if (currentView === 'join-form' && !selectedPlan) {
      window.location.hash = 'join';
    }
  }, [currentView, selectedPlan]);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDobChange = (e) => {
    const val = e.target.value;
    setDob(val);
    if (val) {
      const birthDate = new Date(val);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(Math.max(0, calculatedAge));
    } else {
      setAge('');
    }
  };

  const handleRefChange = (e) => {
    const val = e.target.value;
    setHasReference(val);
    if (val === 'No') {
      setReferenceName('');
    }
  };

  const handlePlanSelection = (plan) => {
    if (!session) {
      localStorage.setItem('intendedPlan', plan);
      window.location.hash = 'login';
      window.scrollTo(0, 0);
    } else {
      setSelectedPlan(plan);
      window.location.hash = 'join-form';
      window.scrollTo(0, 0);
    }
  };

  // Capped Dates: 9th August to 6th September
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(2026, 8, 13); // 13 September 2026

  const interviewDates = [];

  for (
    let date = new Date(today);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.getDay();

    // 0 = Sunday, 6 = Saturday
    if (day === 0 || day === 6) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayOfMonth = String(date.getDate()).padStart(2, '0');

      interviewDates.push({
        value: `${year}-${month}-${dayOfMonth}`,
        label: date.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'long'
        })
      });
    }
  }

  // 8 PM to 10 PM slots (20:00 to 21:50) - 10 min each
  const interviewTimes = Array.from({ length: 12 }, (_, index) => {
    const minutes = 20 * 60 + index * 10;
    const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
    const mins = String(minutes % 60).padStart(2, '0');
    return `${hours}:${mins}`;
  });

  const [stepErrors, setStepErrors] = useState({});

  const validateName = (value) => {
    return /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(value.trim());
  };

  const getCountryFlag = (code) => {
    if (!code || code.length !== 2) return '';

    return code
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join('');
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const errors = {};

    const emailStr = data.get("email") || email;
    const phoneStr = data.get("phone");
    const firstNameStr = data.get("firstName")?.trim() || "";
    const middleNameStr = data.get("middleName")?.trim() || "";
    const lastNameStr = data.get("lastName")?.trim() || "";
    const ageVal = parseInt(age, 10);
    const dobStr = data.get("dob") || dob;

    // Phone validation
    // Phone validation
    if (!phoneStr) {
      errors.phone = "Phone number is required.";
    } else if (!isValidPhoneNumber(phoneStr, phoneCountry.code)) {
      errors.phone = `Enter a valid ${phoneCountry.name} phone number.`;
    }

    // Email validation
    if (!emailStr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
      errors.email = "Enter a valid email address.";
    }

    // Name validation
    if (!firstNameStr || !validateName(firstNameStr)) {
      errors.firstName =
        "First name can contain only alphabets, spaces, hyphens, and apostrophes.";
    }

    if (middleNameStr && !validateName(middleNameStr)) {
      errors.middleName =
        "Middle name can contain only alphabets, spaces, hyphens, and apostrophes.";
    }

    if (!lastNameStr || !validateName(lastNameStr)) {
      errors.lastName =
        "Last name can contain only alphabets, spaces, hyphens, and apostrophes.";
    }

    // DOB validation
    if (!dobStr) {
      errors.dob = "Date of birth is required.";
    } else if (isNaN(ageVal) || ageVal <= 0) {
      errors.dob = "Invalid date of birth (must be > 0 years).";
    }

    // Stop if validation errors exist
    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return;
    }

    setStepErrors({});
    window.scrollTo(0, 0);
    setStep(s => s + 1);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const errors = {};

    const omega = data.get("omegaForm");
    const idProof = data.get("idProof");
    const plan = selectedPlan;
    const emergContact = data.get("emergencyNumber");
    const hasRef = hasReference;
    const refName = referenceName;

    if (!plan) errors.plan = "Membership type must be selected.";
    if (omega && omega.size > 5 * 1024 * 1024) errors.omegaForm = "File too large (max 5MB).";
    if (idProof && idProof.size > 5 * 1024 * 1024) errors.idProof = "File too large (max 5MB).";

    if (!emergContact) {
      errors.emergencyNumber = "Emergency contact number is required.";
    } else if (!isValidPhoneNumber(emergContact, emergencyCountry.code)) {
      errors.emergencyNumber =
        `Enter a valid ${emergencyCountry.name} phone number.`;
    }

    if (hasRef === 'Yes' && (!refName || refName.trim() === '')) {
      errors.referenceName = "Reference name is required if you select 'Yes'.";
    }

    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors({});
    window.scrollTo(0, 0);
    setStep(s => s + 1);
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    setStep(s => s + 1);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setStep(s => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.scrollTo(0, 0);
      setStep(5);
    }, 1500);
  };

  const FeatureItem = ({ text, bold }) => (
    <li className="flex items-start gap-3 text-sm group cursor-default">
      <CheckCircle2 className="text-[#EBB700] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-125" size={18} />
      <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${bold ? 'font-bold' : ''} transition-colors duration-300 group-hover:${isDarkTheme ? 'text-white' : 'text-black'}`}>{text}</span>
    </li>
  );

  const isFormView = currentView === 'join-form' && selectedPlan;

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      <style>{`
        @keyframes slideFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .step-animation { animation: slideFadeIn 0.5s ease-out forwards; }
      `}</style>

      {!isFormView ? (
        // PRICING CARDS VIEW
        <div className="max-w-6xl mx-auto step-animation py-8">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Choose Your Membership</h1>
            <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Select the perfect plan to begin your leadership journey with Leo Club Chandigarh Fortune.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* Regular Plan */}
            <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isDarkTheme ? 'bg-[#1A1A1A] border-gray-800 hover:border-gray-600 hover:shadow-white/5' : 'bg-white border-gray-200 hover:border-[#00338D]/40'}`}>
              <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Regular</h3>
              <div className="mt-4 mb-6 flex flex-col justify-end h-[68px]">
                <div>
                  <span className={`text-4xl font-black ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>₹719</span>
                  <span className={`text-sm ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>/year</span>
                </div>
              </div>
              <button onClick={() => handlePlanSelection('Regular')} className={`w-full py-3 rounded-xl font-bold transition-all duration-300 border-2 hover:scale-105 active:scale-95 ${isDarkTheme ? 'border-gray-700 text-white hover:bg-gray-800 hover:border-gray-500' : 'border-gray-200 text-[#172033] hover:bg-gray-50 hover:border-[#00338D]/30'}`}>
                Choose Regular
              </button>
              <ul className="mt-8 space-y-4">
                <FeatureItem text="LinkedIn Resource Kit" />
                <FeatureItem text="Resume Building" />
                <FeatureItem text="Digital Membership Badge" />
                <FeatureItem text="Physical Joining Kit" />
                <FeatureItem text="Orientation Ceremony" />
                <FeatureItem text="T-shirt available separately at ₹499" />
              </ul>
            </div>

            {/* Fellowship Plan - Highlighted */}
            <div className={`p-8 rounded-3xl border-2 relative transform md:-translate-y-4 md:scale-105 transition-all duration-300 hover:-translate-y-6 ${isDarkTheme ? 'bg-gradient-to-b from-[#1A1D2B] to-[#121212] border-[#00338D] shadow-[0_0_20px_rgba(0,51,141,0.4)] hover:shadow-[0_0_35px_rgba(0,51,141,0.6)]' : 'bg-white border-[#00338D] shadow-xl shadow-[#00338D]/10 hover:shadow-2xl hover:shadow-[#00338D]/20'}`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#EBB700] text-[#172033] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
                Best Value
              </div>
              <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}`}>Fellowship</h3>
              <div className="mt-4 mb-6 flex flex-col justify-end h-[68px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg line-through font-semibold ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>₹1,999</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${isDarkTheme ? 'bg-[#EBB700]/10 text-[#EBB700] border-[#EBB700]/30' : 'bg-[#00338D]/10 text-[#00338D] border-[#00338D]/30'}`}>SAVE ₹850</span>
                </div>
                <div>
                  <span className={`text-4xl font-black ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>₹1,149</span>
                  <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>/year</span>
                </div>
              </div>
              <button onClick={() => handlePlanSelection('Fellowship')} className="w-full bg-[#EBB700] text-[#172033] py-3 rounded-xl font-bold transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-[#EBB700]/30 hover:scale-105 active:scale-95">
                Choose Fellowship
              </button>
              <ul className="mt-8 space-y-4">
                <FeatureItem text="Everything in Regular" bold={true} />
                <FeatureItem text="Leo International Pin" />
                <FeatureItem text="2 of 4 Fellowship Programs free" />
                <FeatureItem text="Free networking opportunities" />
                <FeatureItem text="T-shirt available separately at ₹499" />
              </ul>
            </div>

            {/* Elite Plan */}
            <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isDarkTheme ? 'bg-gradient-to-b from-[#1C1C1C] to-[#121212] border-gray-700 hover:border-gray-500 hover:shadow-white/10' : 'bg-gradient-to-b from-gray-50 to-white border-gray-200 hover:border-gray-400'}`}>
              <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>Elite</h3>
              <div className="mt-4 mb-6 flex flex-col justify-end h-[68px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg line-through font-semibold ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>₹2,799</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${isDarkTheme ? 'bg-gray-800 text-gray-300 border-gray-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`}>SAVE ₹600</span>
                </div>
                <div>
                  <span className={`text-4xl font-black ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>₹2,199</span>
                  <span className={`text-sm ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>/year</span>
                </div>
              </div>
              <button onClick={() => handlePlanSelection('Elite')} className={`w-full py-3 rounded-xl font-bold transition-all duration-300 border-2 hover:scale-105 active:scale-95 ${isDarkTheme ? 'border-gray-600 text-white hover:bg-gray-800 hover:border-gray-400' : 'border-gray-300 text-[#172033] hover:bg-white hover:border-gray-500'}`}>
                Choose Elite
              </button>
              <ul className="mt-8 space-y-4">
                <FeatureItem text="Everything in Fellowship" bold={true} />
                <FeatureItem text="All 4 Fellowship Programs free" />
                <FeatureItem text="Club T-shirt included" />
                <FeatureItem text="Closing Party invitation" />
                <FeatureItem text="Priority consideration to lead 1 service project" />
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // FORM VIEW
        <div className="max-w-4xl mx-auto">
          {step < 5 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm font-medium text-gray-500 mb-2">
                <span>Step {step} of 4</span>
                <button onClick={() => window.location.hash = 'join'} className="text-[#EBB700] hover:underline font-bold">Change Plan</button>
              </div>
              <div className={`w-full rounded-full h-2 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div className="bg-[#EBB700] h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
              </div>
            </div>
          )}

          <div className={`rounded-3xl shadow-lg border overflow-hidden transition-all duration-300 ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'}`}>

            {/* STEP 1: PERSONAL DETAILS */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="p-8 md:p-10 step-animation">
                <h2 className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Personal Details</h2>
                <p className={`mb-8 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Tell us about yourself so we can begin your Leo membership application.</p>

                <div className="mb-10">
                  <h3 className={`text-lg font-bold mb-5 border-b pb-2 ${isDarkTheme ? 'text-[#EBB700] border-gray-700' : 'text-[#00338D] border-gray-200'}`}>Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>First Name *</label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        pattern="[A-Za-z]+(?:[ '-][A-Za-z]+)*"
                        title="Name can contain only alphabets, spaces, hyphens, and apostrophes."
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme
                          ? 'bg-[#2A2A2A] border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-black'
                          }`}
                      />
                      {stepErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {stepErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Middle Name</label>
                      <input
                        type="text"
                        name="middleName"
                        pattern="[A-Za-z]+(?:[ '-][A-Za-z]+)*"
                        title="Name can contain only alphabets, spaces, hyphens, and apostrophes."
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme
                          ? 'bg-[#2A2A2A] border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-black'
                          }`}
                      />
                      {stepErrors.middleName && (
                        <p className="text-red-500 text-xs mt-1">
                          {stepErrors.middleName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Last Name *</label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        pattern="[A-Za-z]+(?:[ '-][A-Za-z]+)*"
                        title="Name can contain only alphabets, spaces, hyphens, and apostrophes."
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme
                          ? 'bg-[#2A2A2A] border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-black'
                          }`}
                      />
                      {stepErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {stepErrors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Date of Birth *</label>
                      <input required type="date" name="dob" max={todayStr} value={dob} onChange={handleDobChange} className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
                      {stepErrors.dob && <p className="text-red-500 text-xs mt-1">{stepErrors.dob}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Age *</label>
                      <input required type="number" readOnly value={age} placeholder="Auto-calculated" className={`w-full border rounded-xl px-4 py-3 outline-none cursor-not-allowed ${isDarkTheme ? 'bg-[#1A1A1A] border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Gender *</label>
                      <select required defaultValue="" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                        <option value="" disabled>Select gender</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Blood Group *</label>
                      <select required defaultValue="" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                        <option value="" disabled>Select blood group</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Are you a person of determination (person with disability)?</label>
                      <select defaultValue="No" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                        <option>Yes</option><option>No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${isDarkTheme ? 'text-[#EBB700] border-gray-700' : 'text-[#00338D] border-gray-200'}`}>Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Contact Number
                        <span className="font-normal text-xs block">
                          (Should be available on WhatsApp) *
                        </span>
                      </label>

                      <div className="flex gap-2">

                        {/* Country Code */}
                        <select
                          value={phoneCountry.code}
                          onChange={(e) => {
                            const selected = countries.find(
                              country => country.code === e.target.value
                            );

                            if (selected) {
                              setPhoneCountry(selected);
                              setPhoneNumber('');
                            }
                          }}
                          className={`w-[145px] border rounded-xl px-3 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme
                            ? 'bg-[#2A2A2A] border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-black'
                            }`}
                        >
                          {countries.map(country => (
                            <option
                              key={`${country.code}-${country.dial_code}`}
                              value={country.code}
                            >
                              {getCountryFlag(country.code)} {country.dial_code}
                            </option>
                          ))}
                        </select>

                        {/* Phone Number */}
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setPhoneNumber(value);
                          }}
                          placeholder="Phone number"
                          inputMode="numeric"
                          className={`flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme
                            ? 'bg-[#2A2A2A] border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-black'
                            }`}
                        />

                      </div>

                      <p className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                        {phoneCountry.name} ({phoneCountry.dial_code})
                      </p>

                      {stepErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {stepErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Personal Email ID * <span className="font-normal text-xs block opacity-0">spacer</span></label>
                      <input required type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
                      {stepErrors.email && <p className="text-red-500 text-xs mt-1">{stepErrors.email}</p>}
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${isDarkTheme ? 'text-[#EBB700] border-gray-700' : 'text-[#00338D] border-gray-200'}`}>Location Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Current Address <span className="font-normal text-xs">(Please insert your complete Address) *</span></label>
                      <textarea required rows="2" placeholder="House No, Street, Landmark" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
                    </div>
                    <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>City of Residence *</label><input required type="text" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} /></div>
                    <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Pin Code *</label><input required pattern="[0-9]{6}" inputMode="numeric" placeholder="6-digit PIN" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} /></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${isDarkTheme ? 'text-[#EBB700] border-gray-700' : 'text-[#00338D] border-gray-200'}`}>Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Occupation *</label><input required type="text" placeholder="Student, Engineer, etc." className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} /></div>
                    <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Name of Institute/Organisation/Business *</label><input required type="text" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} /></div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button type="submit" className="w-full sm:w-auto bg-[#EBB700] text-[#172033] px-10 py-3.5 rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-lg">
                    Continue to Documents
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: DOCUMENTS AND MEMBERSHIP */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="p-8 md:p-10 step-animation">
                <h2 className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Documents & References</h2>
                <p className={`mb-10 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Upload required documents and provide your emergency contact & reference.</p>

                <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${isDarkTheme ? 'text-[#EBB700] border-gray-700' : 'text-[#00338D] border-gray-200'}`}>File Uploads</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Upload Leo Omega Form *</label>
                    <input required type="file" name="omegaForm" accept=".pdf,image/*" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
                    {stepErrors.omegaForm && <p className="text-red-500 text-xs mt-1">{stepErrors.omegaForm}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Upload Government ID <span className="font-normal text-xs">(Front & Back Scanned PDF) *</span></label>
                    <input required type="file" name="idProof" accept="application/pdf" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
                    {stepErrors.idProof && <p className="text-red-500 text-xs mt-1">{stepErrors.idProof}</p>}
                  </div>
                </div>

                <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${isDarkTheme ? 'text-[#EBB700] border-gray-700' : 'text-[#00338D] border-gray-200'}`}>Membership Details</h3>
                <div className="mb-10">
                  <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Selected Membership Type *</label>
                  <select required value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option value="" disabled>Select membership type</option>
                    <option value="Regular">Regular Membership (₹{FEES.regular})</option>
                    <option value="Fellowship">Fellowship Membership (₹{FEES.fellowship})</option>
                    <option value="Elite">Elite Membership (₹{FEES.elite})</option>
                  </select>
                </div>

                <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${isDarkTheme ? 'text-[#EBB700] border-gray-700' : 'text-[#00338D] border-gray-200'}`}>Emergency & Reference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div><label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Emergency Contact Person's Name *</label><input required type="text" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} /></div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Emergency Contact Number *
                    </label>

                    <div className="flex gap-2">

                      {/* Emergency Country Code */}
                      <select
                        value={emergencyCountry.code}
                        onChange={(e) => {
                          const selected = countries.find(
                            country => country.code === e.target.value
                          );

                          if (selected) {
                            setEmergencyCountry(selected);
                            setEmergencyNumber('');
                          }
                        }}
                        className={`w-[145px] border rounded-xl px-3 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme
                          ? 'bg-[#2A2A2A] border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-black'
                          }`}
                      >
                        {countries.map(country => (
                          <option
                            key={`${country.code}-${country.dial_code}`}
                            value={country.code}
                          >
                            {getCountryFlag(country.code)} {country.dial_code}
                          </option>
                        ))}
                      </select>

                      {/* Emergency Phone Number */}
                      <input
                        required
                        type="tel"
                        name="emergencyNumber"
                        value={emergencyNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setEmergencyNumber(value);
                        }}
                        placeholder="Phone number"
                        inputMode="numeric"
                        className={`flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme
                          ? 'bg-[#2A2A2A] border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-black'
                          }`}
                      />

                    </div>

                    <p className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                      {emergencyCountry.name} ({emergencyCountry.dial_code})
                    </p>

                    {stepErrors.emergencyNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {stepErrors.emergencyNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Do you have an existing Leo Member as your reference? *</label>
                    <select value={hasReference} onChange={handleRefChange} className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {hasReference === 'Yes' && (
                    <div className="step-animation">
                      <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Reference Person's Name *</label>
                      <input type="text" required value={referenceName} onChange={e => setReferenceName(e.target.value)} placeholder="Provide member name" className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`} />
                      {stepErrors.referenceName && <p className="text-red-500 text-xs mt-1">{stepErrors.referenceName}</p>}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between gap-4">
                  <button type="button" onClick={handleBack} className={`px-8 py-3.5 rounded-xl font-bold border transition-colors ${isDarkTheme ? 'text-gray-300 border-gray-700 hover:bg-gray-800' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}>Back</button>
                  <button type="submit" className="flex-1 bg-[#EBB700] text-[#172033] px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-500 shadow-lg">Choose Interview Slot</button>
                </div>
              </form>
            )}

            {/* STEP 3: INTERVIEW SLOT */}
            {step === 3 && (
              <div className="p-8 md:p-10 step-animation">
                <h2 className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Choose your interview slot</h2>
                <p className={`mb-10 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Interviews are available from 9 August to 6 September, between 8:00 PM and 10:00 PM.</p>

                <label className={`block text-lg font-bold mb-3 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Select Interview Date *</label>
                <select value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className={`w-full border rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-[#EBB700] outline-none mb-8 ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                  <option value="">-- Choose a date --</option>
                  {interviewDates.map((date) => <option key={date.value} value={date.value}>{date.label}</option>)}
                </select>

                <p className={`text-lg font-bold mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Select Available Time (in PM)*</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
                  {interviewTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setInterviewTime(time)}
                      className={`border-2 rounded-xl px-3 py-4 font-bold text-lg transition-all ${interviewTime === time
                        ? 'bg-[#EBB700] text-[#172033] border-[#EBB700] shadow-md transform scale-105'
                        : isDarkTheme
                          ? 'border-gray-700 text-gray-300 hover:border-[#EBB700]'
                          : 'border-gray-200 text-gray-700 hover:border-[#EBB700] bg-gray-50'
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="mt-12 flex justify-between gap-4">
                  <button onClick={handleBack} className={`px-8 py-3.5 rounded-xl font-bold border transition-colors ${isDarkTheme ? 'text-gray-300 border-gray-700 hover:bg-gray-800' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}>Back</button>
                  <button disabled={!interviewDate || !interviewTime} onClick={handleNext} className={`flex-1 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all ${interviewDate && interviewTime ? 'bg-[#EBB700] text-[#172033] hover:bg-yellow-500' : isDarkTheme ? 'bg-gray-800 text-gray-600 cursor-not-allowed shadow-none' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}>Review & Declare</button>
                </div>
              </div>
            )}

            {/* STEP 4: DECLARATION */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="p-8 md:p-10 step-animation">
                <h2 className={`text-3xl font-bold mb-8 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Final Declaration</h2>

                <div className={`p-6 border rounded-2xl mb-8 ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700' : 'bg-yellow-50 border-yellow-200'}`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input required type="checkbox" className="mt-1.5 w-6 h-6 accent-[#EBB700] cursor-pointer" />
                    <span className={`text-base font-medium leading-relaxed ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
                      As a member, Do you agree to comply with the constitution and bylaws of the Leo Club Programe (Chapter XXII | LEO50-O Omega Application | 03/20 EN - Photo/Video Authorization Form) and to abide by the rules and regulations set forth by the Club's Board.
                    </span>
                  </label>
                </div>

                <div className="mt-10 flex justify-between gap-4">
                  <button type="button" onClick={handleBack} disabled={isSubmitting} className={`px-8 py-3.5 rounded-xl font-bold border transition-colors ${isDarkTheme ? 'text-gray-300 border-gray-700 hover:bg-gray-800' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}>Back</button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#EBB700] text-[#172033] px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Submitting Application...</span>
                    ) : (
                      <>Submit Application <CheckCircle2 size={20} /></>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: SUCCESS */}
            {step === 5 && (
              <div className="p-10 text-center py-20 step-animation">
                <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 className="text-green-600" size={56} />
                </div>
                <h2 className={`text-4xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Application Submitted!</h2>
                <p className={`text-lg mb-10 max-w-lg mx-auto leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  Thank you. Your interview is scheduled for <br />
                  <strong className={isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}>{interviewDate}</strong> at <strong className={isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'}>{interviewTime}</strong>.<br /><br />
                  We will contact you on WhatsApp or email with the next steps.
                </p>
                <a href="#home" className="bg-[#EBB700] text-[#172033] px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 shadow-lg transition-transform hover:-translate-y-1 inline-block">
                  Return to Home
                </a>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

const AdminLoginView = ({ isDarkTheme, setIsAdminLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAdminLoggedIn(true);
      window.location.hash = 'admin';
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md rounded-3xl shadow-xl border p-8 sm:p-10 ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="w-16 h-16 rounded-full bg-[#00338D] mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          L
        </div>
        <h1 className={`text-2xl font-bold text-center mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Admin Portal</h1>
        <p className="text-center text-gray-500 text-sm mb-8">Leo Club Chandigarh Fortune</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className={`w-full border rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-bold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <input
              type="password" required value={pwd} onChange={e => setPwd(e.target.value)}
              className={`w-full border rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#EBB700] outline-none ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#EBB700] text-[#172033] py-4 rounded-xl font-bold hover:bg-yellow-500 transition-colors mt-4">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboardView = ({ isDarkTheme, setIsAdminLoggedIn }) => (
  <div className={`min-h-screen flex flex-col md:flex-row ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'}`}>
    {/* Sidebar */}
    <div className={`w-full md:w-64 border-r p-6 flex flex-col ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#00338D] flex items-center justify-center text-white font-bold">L</div>
        <div>
          <h2 className={`font-bold leading-tight ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Admin</h2>
          <p className="text-xs text-green-500 font-bold">Online</p>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <button className={`w-full text-left px-4 py-3 font-bold rounded-xl flex items-center gap-3 ${isDarkTheme ? 'bg-[#2A2A2A] text-[#EBB700]' : 'bg-blue-50 text-[#00338D]'}`}>
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button className={`w-full text-left px-4 py-3 font-medium rounded-xl flex items-center gap-3 ${isDarkTheme ? 'text-gray-400 hover:bg-[#2A2A2A]' : 'text-gray-600 hover:bg-gray-50'}`}>
          <UserPlus size={18} /> Applications
        </button>
      </div>
      <button
        onClick={() => { setIsAdminLoggedIn(false); window.location.hash = 'home'; }}
        className="mt-auto flex items-center gap-2 text-red-500 font-bold px-4 py-3 hover:bg-red-500/10 rounded-xl"
      >
        <LogOut size={18} /> Sign Out
      </button>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6 md:p-10">
      <h1 className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Overview</h1>
      <p className={isDarkTheme ? 'text-gray-400 mb-8' : 'text-gray-500 mb-8'}>Manage applications, payments, and club data.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Pending Applications', value: '18', color: 'text-blue-500' },
          { label: 'Pending Renewals', value: '12', color: 'text-indigo-500' },
          { label: 'UTRs to Verify', value: '7', color: 'text-orange-500' },
          { label: 'Active Members', value: '142', color: 'text-green-500' }
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border shadow-sm ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
            <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* =========================================================================
   MAIN APP RENDER
   ========================================================================= */

export default function LeoClubApp() {
  const [currentView, setCurrentView] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    return hash || 'home';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      // Post-Login Redirect Logic
      if (event === 'SIGNED_IN') {
        if (window.location.hash.includes('access_token')) {
          const intended = localStorage.getItem('intendedPlan');
          if (intended) {
            window.location.hash = 'join-form';
          } else {
            window.location.hash = 'join';
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle browser back button natively
  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '');

      // If it's a Supabase OAuth token URL, ignore our router and let Supabase process it.
      // We render 'home' temporarily to avoid a blank screen while processing.
      if (hash.startsWith('access_token') || hash.startsWith('error')) {
        setCurrentView('home');
        window.scrollTo(0, 0);
        return;
      }

      if (hash) {
        // Drop any URL parameters just in case
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
      {/* Hide main NavBar and Footer for Portal views */}
      {!['admin', 'member'].includes(currentView) && (
        <NavBar
          session={session}
          currentView={currentView}
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}

      <main>
        {currentView === 'home' && <HomeView isDarkTheme={isDarkTheme} session={session} />}
        {currentView === 'login' && <AuthView isDarkTheme={isDarkTheme} />}
        {currentView.startsWith('join') && <JoinView currentView={currentView} isDarkTheme={isDarkTheme} session={session} />}
        {currentView === 'projects' && <ProjectsView isDarkTheme={isDarkTheme} />}
        {currentView === 'contact' && <ContactView isDarkTheme={isDarkTheme} />}
        {currentView === 'admin-login' && <AdminLoginView isDarkTheme={isDarkTheme} setIsAdminLoggedIn={setIsAdminLoggedIn} />}

        {/* New Portal Routes */}
        {currentView === 'member' && <MemberPortalApp session={session} isDarkTheme={isDarkTheme} />}
        {currentView === 'admin' && (isAdminLoggedIn ? <AdminPortalApp isDarkTheme={isDarkTheme} setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <AdminLoginView isDarkTheme={isDarkTheme} setIsAdminLoggedIn={setIsAdminLoggedIn} />)}
      </main>

      {!['admin', 'member'].includes(currentView) && <Footer isDarkTheme={isDarkTheme} />}
    </div>
  );
}