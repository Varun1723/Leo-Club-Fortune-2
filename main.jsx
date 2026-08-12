import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, Mail, CheckCircle2, ChevronRight,
  Phone, Send, MapPin, ArrowRight, ShieldCheck,
  Award, Briefcase, Users, Globe, Heart, BookOpen, HandHelping
} from 'lucide-react';
import './style.css';

const BRAND = {
  blue: '#00338D',
  yellow: '#EBB700',
  gray: '#55565A',
  lightGray: '#F6F8FB'
};

const ASSETS = {
  lionsEmblem: "/icons/lions-emblem.png",
  leoLogo: "/icons/leo-logo.png",
  bgMain: "/icons/bg-main.png",
  ourImpact: "/public/photos/Picture1.png",
  becomeLeo: "/icons/become-leo-bg.png",
  causes: {
    childhoodCancer: "/public/photos/Picture4.png",
    diabetes: "/public/photos/Picture5.png",
    disasterRelief: "/public/photos/Picture6.png",
    environment: "/public/photos/Picture7.png",
    hunger: "/public/photos/Picture8.png",
    humanitarian: "/public/photos/Picture9.png",
    vision: "/public/photos/Picture10.png",
    youth: "/public/photos/Picture11.png",
  },
};

/* =========================================================================
   COMPONENTS
   ========================================================================= */

const NavBar = ({ currentView, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <nav className="sticky top-0 z-50 shadow-sm nav-bar">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20">
        <a href="#home" className="flex items-center gap-4 cursor-pointer">
          <div className="flex items-center gap-3 py-2" aria-label="Lions International and Leo Club logos">
            <img src={ASSETS.lionsEmblem} alt="Lions International emblem" className="w-11 h-11 object-contain" />
            <img src={ASSETS.leoLogo} alt="Leo Club emblem" className="w-11 h-11 object-contain" />
          </div>
          <div className="hidden sm:block border-l border-white/30 pl-4">
            <h1 className="font-bold text-lg leading-tight text-white">Leo Club Chandigarh Fortune</h1>
            <p className="text-xs text-white/70 font-medium tracking-[0.18em] uppercase">We Serve</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          <a href="#home" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'home'
            ? 'bg-white/20 text-white'
            : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}>About Us</a>
          <a href="#projects" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'projects'
            ? 'bg-white/20 text-white'
            : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}>Membership & Benefits</a>

          <div className="h-6 w-px bg-white/30 mx-2"></div>

          <a href="#contact" className="ml-2 bg-[#EBB700] text-[#172033] px-6 py-2.5 rounded-full font-bold hover:bg-yellow-400 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 group">
            Join Now <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-3">
          <a href="#contact" className="bg-[#EBB700] text-[#172033] px-4 py-2 rounded-full font-bold text-sm inline-block transition-transform active:scale-95">
            Join Now
          </a>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {isMobileMenuOpen && (
      <div className="md:hidden absolute w-full shadow-xl mobile-menu-dropdown">
        <div className="px-4 pt-2 pb-6 space-y-1">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left px-4 py-3 text-base font-medium rounded-xl text-white hover:bg-white/10">About Us</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left px-4 py-3 text-base font-medium rounded-xl text-white hover:bg-white/10">Membership & Benefits</a>
        </div>
      </div>
    )}
  </nav>
);

const Footer = () => (
  <footer className="footer-section pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img src={ASSETS.leoLogo} alt="Leo Club emblem" className="w-10 h-10 object-contain" />
            <span className="font-bold text-lg text-white">Leo Club Chandigarh Fortune</span>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            Affiliated with Lions Clubs International. Empowering youth to lead, serve, and inspire in Chandigarh and beyond.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#EBB700]">Organization</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#home" className="transition-colors hover:text-white">About Us</a></li>
            <li><a href="#projects" className="transition-colors hover:text-white">Membership & Benefits</a></li>
            <li><a href="#contact" className="transition-colors hover:text-white">Join Now</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#EBB700]">Contact</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2 group"><Mail size={16} className="text-[#EBB700] transition-transform duration-300 group-hover:scale-110" /> leoclubchandigarhfortune@gmail.com</li>
            <li className="flex items-center gap-2 group"><Phone size={16} className="text-[#EBB700] transition-transform duration-300 group-hover:scale-110" /> +91 94787 52781, +91 70875 66750</li>
            <li><a href="#contact" className="transition-colors hover:text-white">Reach Out Form</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/20 text-center text-sm flex flex-col md:flex-row justify-between items-center text-white/50">
        <p>&copy; 2026 Leo Club Chandigarh Fortune. All rights reserved.</p>
        <p className="mt-2 md:mt-0 font-bold text-[#EBB700]">We Serve.</p>
      </div>
    </div>
  </footer>
);

const HomeView = () => (
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
    <div className="relative overflow-hidden hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 animate-slide-up">
        <div className="max-w-3xl">
          <span className="text-[#EBB700] font-bold tracking-widest uppercase text-sm mb-4 block flex items-center gap-2">
            <ShieldCheck size={18} /> Lions Clubs International
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Leo Club<br />
            <span className="text-[#EBB700]">Chandigarh Fortune</span>
          </h1>
          <p className="mt-4 text-xl max-w-2xl leading-relaxed text-white/85">
            Be a part of a global network of 1.4 million members across more than 49,000 clubs, bringing hands and hearts together to serve communities in nearly every country around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="#contact" className="bg-[#EBB700] text-[#172033] hover:bg-yellow-400 transition-all duration-300 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 w-fit hover:-translate-y-1 hover:shadow-xl group">
              Join Now <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Our Impact Section */}
    <div className="content-section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up delay-150">
          <h2 className="text-3xl font-bold mb-4 text-white">Our Impact</h2>
          <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-6"></div>
        </div>
        <div className="max-w-5xl mx-auto animate-slide-up delay-150">
          <img src={ASSETS.ourImpact} alt="Our Impact - 150+ Members, 41 Service Projects, 5,000+ People Served, INR 2.7 Lakhs Contributed" className="w-full rounded-2xl shadow-2xl" />
        </div>
      </div>
    </div>

    {/* About Us Section */}
    <div className="content-section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up delay-150">
          <h2 className="text-3xl font-bold mb-4 text-white">About Us</h2>
          <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-6"></div>
        </div>
        <div className="max-w-4xl mx-auto animate-slide-up delay-150">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <p className="text-lg leading-relaxed text-white/85">
              Leo Club Chandigarh Fortune is a youth-led community service club sponsored by Lions Club Chandigarh Greater and affiliated with the Leo Club Programme of Lions Clubs International, the world's largest service organisation. In line with Lions Clubs International's global service priorities, the Club carries out local community projects and outreach initiatives focused on vision care and blindness prevention, support for children affected by cancer, diabetes awareness, combating hunger, environmental protection, humanitarian assistance, and youth education and empowerment. Chartered in 2018, the Club has an active membership base of more than 150 volunteers across Chandigarh, Mohali and Panchkula, India.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Ways We Serve / Global Causes Section */}
    <div className="content-section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 animate-slide-up delay-150">
          <h2 className="text-3xl font-bold mb-4 text-white">Ways We Serve</h2>
          <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-white/70">As Leos, we take on some of the greatest challenges facing our local communities through hands-on service and advocacy, with our efforts focused across 8 global causes.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12 animate-slide-up delay-150">
          {[
            { name: "Childhood Cancer", icon: ASSETS.causes.childhoodCancer, desc: "We provide support for the needs of children and families affected by childhood cancer." },
            { name: "Diabetes", icon: ASSETS.causes.diabetes, desc: "We work to reduce the prevalence of diabetes and improve quality of life for those living with diabetes." },
            { name: "Disaster Relief", icon: ASSETS.causes.disasterRelief, desc: "We take steps to meet immediate needs and provide long-term support for communities devastated by natural disasters." },
            { name: "Environment", icon: ASSETS.causes.environment, desc: "We find ways to protect the environment to create healthier communities and a more sustainable world." },
            { name: "Hunger", icon: ASSETS.causes.hunger, desc: "We strive to improve food security and access to nutritious food to help alleviate hunger." },
            { name: "Humanitarian", icon: ASSETS.causes.humanitarian, desc: "We identify the world's most crucial needs and provide humanitarian aid to assist people in disaster and crisis situations." },
            { name: "Vision", icon: ASSETS.causes.vision, desc: "We help prevent avoidable blindness and improve quality of life for people who are blind or visually impaired." },
            { name: "Youth", icon: ASSETS.causes.youth, desc: "We support young people so they can make positive choices, lead healthy and productive lives, and become the next generation of service leaders." }
          ].map((cause, idx) => (
            <div key={idx} className="cause-card rounded-2xl overflow-hidden shadow-lg">
              <img src={cause.icon} alt={cause.name} className="w-full aspect-[3/4] object-cover" />
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center animate-slide-up delay-150">
          <p className="text-lg text-white/80 italic leading-relaxed">
            Leos feel a great sense of satisfaction from doing what is at the heart of Lions International — serving others. You will have the opportunity to give your time, share your talents, help your community, and feel proud knowing you change lives.
          </p>
        </div>
      </div>
    </div>

    {/* Become a Leo CTA */}
    <div className="content-section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="become-leo-card rounded-2xl p-12 md:p-16 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Become a Leo</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Step into your potential and take the opportunity to grow as an individual and a leader. Sign up today and be part of something bigger.
            </p>
            <a href="#contact" className="bg-[#EBB700] text-[#172033] hover:bg-yellow-400 transition-all duration-300 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 hover:-translate-y-1 hover:shadow-xl group">
              Join Now <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsView = () => {
  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.6s ease-out forwards;
        }
      `}</style>

      {/* Hero */}
      <section className="hero-section relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 animate-slide-up">
          <p className="text-[#EBB700] font-bold tracking-[0.18em] uppercase text-sm mb-4">Being a Leo</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">Membership & Benefits</h1>
          <p className="text-xl max-w-3xl leading-relaxed text-white/85">
            There are a lot of ways people can give back to their community — but being a Leo is much more than just service. Choosing to join a Leo club will help you grow as an individual and as a leader as you join a global family of young people making the world a better place.
          </p>
        </div>
      </section>

      {/* Membership Section */}
      <section className="content-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold mb-4 text-white">Membership</h2>
            <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-8"></div>
          </div>
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="glass-card rounded-2xl p-8 md:p-12 space-y-6">
              <p className="text-lg leading-relaxed text-white/85">
                For volunteers ages 18 to 30, Leos are where it's at. Leos are committed to serving, growing their leadership skills and making connections, and above all, to bringing positive change to the world. When Leos come together to serve, things get done and they have a great time doing it.
              </p>
              <p className="text-lg leading-relaxed text-white/85">
                With 7,700+ Leo clubs worldwide, our community brings together thousands of young changemakers from diverse backgrounds, cultures and institutions like you who have decided to take action and serve those in need. Leo Club Chandigarh Fortune reflects that diversity, with members from leading institutions including Panjab University and its affiliated colleges, Amity University, Chandigarh University, PEC, Thapar Institute of Engineering & Technology and many more.
              </p>
              <p className="text-lg leading-relaxed text-white/85">
                So step into your potential and take the opportunity to grow as an individual and a leader. Sign up today and be part of something bigger.
              </p>
              <div className="glass-card rounded-xl p-6 mt-4 border-l-4 border-[#EBB700]">
                <p className="text-sm text-white/70 italic">
                  Note: Membership is subject to limited availability and is offered through a selective recruitment process. All applications are subject to screening, and shortlisted applicants will be required to undergo a personal interview prior to final selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="content-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold mb-4 text-white">Benefits of Leo Membership</h2>
            <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-white/70">Being a Leo brings so much more with it. As a member, you get to:</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-slide-up">
            {[
              { icon: <Briefcase size={28} />, title: "Gain Experience", desc: "Take part in real community projects, work across various club committees and teams, take on responsibility and build experience you can carry into college, work and future leadership roles." },
              { icon: <Award size={28} />, title: "Strengthen Your Profile", desc: "Receive globally recognised credentials for your service through a volunteer certificate and LOR, showcase your membership with a digital LinkedIn badge, and access one-to-one CV/resume review support." },
              { icon: <Users size={28} />, title: "Build Your Network", desc: "As a Leo, you'll build connections within your club and with local leaders you collaborate with in service. You'll also get to connect with fellow Leos across the region and around the world who are serving their communities, just like you!" },
              { icon: <Globe size={28} />, title: "Gain Lion Credibility", desc: "There are Lions and Leos in over 200 countries and geographic areas who share your passion for service. Gain the respect that comes with being part of a global organisation known for its contributions to humanity for over 100 years." },
              { icon: <Heart size={28} />, title: "Make New Friends", desc: "Feel a sense of belonging with the other members of your club, as well as the over 1.4 million Lions and Leos around the world. Through the MyLion App, you can connect with other service-minded men and women locally, regionally and internationally." },
              { icon: <BookOpen size={28} />, title: "Show Your Leadership", desc: "As a Leo, you gain access to our online learning management system, where you can sharpen your leadership and organisational skills. You will also have the opportunity to lead within your club and gain valuable, practical experience for use in your personal and professional life." },
              // { icon: <HandHelping size={28} />, title: "Receive Global Support", desc: "Every Leo and every club are supported by a global network of volunteers, the Lions Clubs International staff, and the Lions Clubs International Foundation (LCIF), which provides grant funding to support the compassionate work of Leos, empowering their service and addressing the needs of their communities both locally and globally." },
            ].map((benefit, idx) => (
              <div key={idx} className="benefit-card glass-card rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="text-[#EBB700] mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Make the Most of Your Membership */}
      <section className="content-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="become-leo-card rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Make the Most of Your Membership</h2>
              <div className="w-16 h-1.5 bg-[#EBB700] mx-auto rounded-full mb-8"></div>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                There are many ways to make the most of your journey as a Leo. From stepping into leadership roles to developing new skills and gaining knowledge through Lions International's leadership development institutes, every Leo journey is unique.
              </p>
              <a href="#contact" className="bg-[#EBB700] text-[#172033] hover:bg-yellow-400 transition-all duration-300 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 hover:-translate-y-1 hover:shadow-xl group">
                Join Now to Experience More <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactView = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">

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

      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 animate-slide-up">
          <p className="font-sans text-[#EBB700] font-bold tracking-[0.18em] uppercase text-sm mb-4">Get in touch</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 text-white">Let's serve together.</h1>
          <p className="text-lg max-w-2xl text-white/80">Reach out for general inquiries, club information, or service partnerships. Fill out the form below and we'll get back to you.</p>
        </div>
      </section>

      <section className="content-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
        <aside className="border-l-4 border-[#EBB700] pl-6 self-start animate-slide-up delay-100">
          <h2 className="text-2xl font-bold mb-5 text-white">Leo Club Chandigarh Fortune</h2>
          <div className="space-y-5 text-white/60">
            <p className="flex items-start gap-3 group cursor-default"><Mail className="shrink-0 mt-1 text-[#EBB700] transition-transform duration-300 group-hover:scale-110" size={19} /><span><strong className="font-sans block text-white/90">Email</strong>leoclubchandigarhfortune@gmail.com</span></p>
            <p className="flex items-start gap-3 group cursor-default"><Phone className="shrink-0 mt-1 text-[#EBB700] transition-transform duration-300 group-hover:scale-110" size={19} /><span><strong className="font-sans block text-white/90">Phone</strong>+91 94787 52781, +91 70875 66750</span></p>
            <p className="flex items-start gap-3 group cursor-default"><MapPin className="shrink-0 mt-1 text-[#EBB700] transition-transform duration-300 group-hover:scale-110" size={19} /><span><strong className="font-sans block text-white/90">Serving</strong>Chandigarh and the surrounding community</span></p>
          </div>
          <div className="mt-10 pt-7 border-t border-white/20">
            <p className="text-white/50">For urgent, time-sensitive service requests, please call rather than using this form.</p>
          </div>
        </aside>

        <div
          className="contact-form-card p-7 md:p-10 transition-all duration-300 animate-slide-up delay-200"
        >
          {submitted ? (
            <div className="py-12 text-center animate-slide-up">
              <CheckCircle2 className="mx-auto text-[#EBB700] mb-5" size={52} />
              <h2 className="text-3xl font-bold mb-3 text-white">Thank you for reaching out.</h2>
              <p className="max-w-md mx-auto text-white/60">Your message has been recorded. A club representative will respond soon.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-3 font-bold transition-colors bg-[#EBB700] text-[#172033] hover:bg-yellow-400">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Contact us</h2>
                <p className="mt-2 text-white/60">Fields marked with an asterisk are required.</p>
              </div>

              {/* Name Row */}
              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">First Name *</label>
                  <input required type="text" className="form-input w-full px-4 py-3 outline-none" placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Middle Name</label>
                  <input type="text" className="form-input w-full px-4 py-3 outline-none" placeholder="Middle Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Last Name *</label>
                  <input required type="text" className="form-input w-full px-4 py-3 outline-none" placeholder="Last Name" />
                </div>
              </div>

              {/* Personal Details Row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Date of Birth *</label>
                  <input required type="date" className="form-input w-full px-4 py-3 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Gender *</label>
                  <select required defaultValue="" className="form-input w-full px-4 py-3 outline-none">
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
                <label className="block text-sm font-bold mb-2 text-white/90">Email ID *</label>
                <input required type="email" className="form-input w-full px-4 py-3 outline-none" placeholder="name@example.com" />
              </div>

              {/* Professional/Educational Details */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Occupation *</label>
                  <input required type="text" className="form-input w-full px-4 py-3 outline-none" placeholder="Student, Engineer, etc." />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Organisation / Institute *</label>
                  <input required type="text" className="form-input w-full px-4 py-3 outline-none" placeholder="Institute Name" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold mb-2 text-white/90">Message / Inquiry</label>
                <textarea rows={4} className="form-input w-full px-4 py-3 outline-none" placeholder="Tell us how we can assist you..." />
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#EBB700] text-[#172033] px-7 py-3.5 font-bold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2 shadow-md">
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
    <div className="app-wrapper min-h-screen">
      <NavBar
        currentView={currentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main>
        {currentView === 'home' && <HomeView />}
        {currentView === 'projects' && <ProjectsView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      <Footer />
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
