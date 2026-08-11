import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, User, CreditCard, Calendar, FileText, Bell, 
  CheckCircle2, Clock, XCircle, LogOut, ChevronRight, UploadCloud, Eye
} from 'lucide-react';

const MemberPortalApp = ({ session, isDarkTheme }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!session) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'bg-[#121212] text-white' : 'bg-gray-50 text-[#172033]'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-6">Please log in to access the Member Portal.</p>
          <a href="#login" className="bg-[#EBB700] text-[#172033] px-8 py-3 rounded-xl font-bold inline-block">Go to Login</a>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'membership', label: 'My Membership', icon: CreditCard },
    { id: 'interview', label: 'Interview', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className={`min-h-[calc(100vh-80px)] flex flex-col md:flex-row ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      
      {/* Sidebar Desktop */}
      <div className={`hidden md:flex flex-col w-64 border-r ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="p-6">
          <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Member Portal</h2>
          <p className={isDarkTheme ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>Leo Club Chandigarh</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id 
                  ? (isDarkTheme ? 'bg-[#2A2A2A] text-[#EBB700]' : 'bg-blue-50 text-[#00338D]') 
                  : (isDarkTheme ? 'text-gray-400 hover:bg-[#2A2A2A]' : 'text-gray-600 hover:bg-gray-50')
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden flex overflow-x-auto border-b ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'} hide-scrollbar`}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-all ${
              activeTab === tab.id 
                ? (isDarkTheme ? 'border-[#EBB700] text-[#EBB700]' : 'border-[#00338D] text-[#00338D]') 
                : 'border-transparent text-gray-500'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'overview' && <OverviewTab isDarkTheme={isDarkTheme} session={session} />}
          {activeTab === 'profile' && <ProfileTab isDarkTheme={isDarkTheme} session={session} />}
          {activeTab === 'membership' && <MembershipTab isDarkTheme={isDarkTheme} />}
          {activeTab === 'interview' && <InterviewTab isDarkTheme={isDarkTheme} />}
          {activeTab === 'documents' && <DocumentsTab isDarkTheme={isDarkTheme} />}
          {activeTab === 'notifications' && <NotificationsTab isDarkTheme={isDarkTheme} />}
        </div>
      </div>
      
    </div>
  );
};

// -------------------------------------------------------------
// TABS
// -------------------------------------------------------------

const OverviewTab = ({ isDarkTheme, session }) => {
  const steps = [
    { label: 'Application Submitted', completed: true },
    { label: 'Profile Review', completed: true },
    { label: 'Interview', completed: false, current: true },
    { label: 'Payment', completed: false },
    { label: 'Active Member', completed: false }
  ];

  return (
    <div className="space-y-8 animate-[slideFadeIn_0.4s_ease-out_forwards]">
      <div className="flex items-center gap-4">
        <img 
          src={session?.user?.user_metadata?.avatar_url || '/icons/leo-logo.png'} 
          alt="Profile" 
          className="w-16 h-16 rounded-full border-2 border-[#EBB700] shadow-sm object-cover" 
        />
        <div>
          <h1 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>
            Welcome, {session?.user?.user_metadata?.full_name || 'Member'}!
          </h1>
          <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>Application ID: LCCF-{session?.user?.id?.substring(0,6).toUpperCase()}</p>
        </div>
      </div>

      <div className={`p-6 md:p-8 rounded-2xl border ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'} shadow-sm`}>
        <h3 className={`text-lg font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Application Timeline</h3>
        <div className="relative">
          <div className={`absolute left-[15px] top-4 bottom-4 w-1 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  step.completed ? 'bg-green-100 text-green-600' : 
                  step.current ? 'bg-blue-100 text-[#00338D]' : 
                  isDarkTheme ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.completed ? <CheckCircle2 size={18} /> : (step.current ? <Clock size={18} /> : <div className="w-2.5 h-2.5 rounded-full bg-current opacity-50" />)}
                </div>
                <div className="pt-1">
                  <p className={`font-bold ${
                    step.completed ? (isDarkTheme ? 'text-green-400' : 'text-green-700') :
                    step.current ? (isDarkTheme ? 'text-blue-400' : 'text-[#00338D]') :
                    (isDarkTheme ? 'text-gray-500' : 'text-gray-400')
                  }`}>{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700' : 'bg-blue-50 border-blue-100'}`}>
        <h3 className={`font-bold text-lg mb-2 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Next Action Required</h3>
        <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
          Your interview has been scheduled. Please check the Interview tab for the meeting link and details.
        </p>
        <button className="bg-[#EBB700] text-[#172033] px-6 py-2 rounded-xl font-bold hover:bg-yellow-500 shadow-md">
          View Interview Details
        </button>
      </div>
    </div>
  );
};

const ProfileTab = ({ isDarkTheme }) => (
  <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'} animate-[slideFadeIn_0.4s_ease-out_forwards]`}>
    <div className="flex justify-between items-center mb-6">
      <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>My Profile</h2>
      <button className={`px-4 py-2 text-sm font-bold rounded-xl border ${isDarkTheme ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>Edit Profile</button>
    </div>
    
    <div className="space-y-8">
      <div>
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b ${isDarkTheme ? 'text-gray-500 border-gray-800' : 'text-gray-400 border-gray-100'}`}>Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Phone</p><p className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>+91 9876543210</p></div>
          <div><p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Date of Birth</p><p className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>12 Aug 2002</p></div>
          <div><p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Blood Group</p><p className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>O+</p></div>
          <div><p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Gender</p><p className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Male</p></div>
        </div>
      </div>
      <div>
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b ${isDarkTheme ? 'text-gray-500 border-gray-800' : 'text-gray-400 border-gray-100'}`}>Professional & Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Occupation</p><p className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Student</p></div>
          <div><p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Institute</p><p className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Chandigarh University</p></div>
          <div className="md:col-span-2"><p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-400 text-xs'}>Address</p><p className={`font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Sector 22, Chandigarh, 160022</p></div>
        </div>
      </div>
    </div>
  </div>
);

const MembershipTab = ({ isDarkTheme }) => (
  <div className="animate-[slideFadeIn_0.4s_ease-out_forwards]">
    <div className={`p-8 rounded-3xl border-2 relative ${isDarkTheme ? 'bg-gradient-to-b from-[#1A1D2B] to-[#121212] border-[#00338D]' : 'bg-white border-[#00338D] shadow-xl'}`}>
      <div className="absolute top-6 right-6">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${isDarkTheme ? 'bg-yellow-500/20 text-[#EBB700]' : 'bg-yellow-100 text-yellow-800'}`}>
          Payment Pending
        </span>
      </div>
      <h2 className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#00338D]'}`}>Fellowship Plan</h2>
      <p className={`text-4xl font-black mb-8 ${isDarkTheme ? 'text-[#EBB700]' : 'text-[#172033]'}`}>₹1,149 <span className="text-sm text-gray-500 font-normal">/ year</span></p>
      
      <div className="space-y-4 mb-8">
        {['Regular benefits included', 'Leo International Pin', '2 of 4 Fellowship Programs free', 'Free networking opportunities'].map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle2 className="text-[#EBB700]" size={20} />
            <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>{f}</span>
          </div>
        ))}
      </div>
      <button className="w-full bg-[#EBB700] text-[#172033] py-4 rounded-xl font-bold hover:bg-yellow-500 shadow-md">
        Pay Membership Fee
      </button>
    </div>
  </div>
);

const InterviewTab = ({ isDarkTheme }) => (
  <div className={`p-8 rounded-3xl border text-center ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'} animate-[slideFadeIn_0.4s_ease-out_forwards]`}>
    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Calendar className="text-[#00338D]" size={32} />
    </div>
    <h2 className={`text-2xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Interview Scheduled</h2>
    <p className={`mb-8 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Your application review is complete. Please join the interview slot you selected.</p>
    
    <div className={`max-w-md mx-auto p-6 rounded-2xl mb-8 border ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div>
          <p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-500 text-xs uppercase font-bold tracking-wider'}>Date</p>
          <p className={`font-bold text-lg ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>15 Aug 2026</p>
        </div>
        <div>
          <p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-500 text-xs uppercase font-bold tracking-wider'}>Time</p>
          <p className={`font-bold text-lg ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>20:30 IST</p>
        </div>
        <div className="col-span-2">
          <p className={isDarkTheme ? 'text-gray-500 text-xs' : 'text-gray-500 text-xs uppercase font-bold tracking-wider'}>Interviewer</p>
          <p className={`font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Leo Club Admin</p>
        </div>
      </div>
    </div>
    <button className="bg-[#00338D] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-[#EBB700] hover:text-[#172033] shadow-lg transition-all">
      Join Meeting Link
    </button>
  </div>
);

const DocumentsTab = ({ isDarkTheme }) => (
  <div className={`p-8 rounded-3xl border ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'} animate-[slideFadeIn_0.4s_ease-out_forwards]`}>
    <h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Uploaded Documents</h2>
    
    <div className="space-y-4">
      {[
        { name: 'Leo_Omega_Form.pdf', status: 'Verified', date: '10 Aug 2026' },
        { name: 'ID_Proof_Front_Back.pdf', status: 'Under Review', date: '10 Aug 2026' }
      ].map((doc, i) => (
        <div key={i} className={`p-5 rounded-2xl border flex items-center justify-between ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkTheme ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <FileText className={isDarkTheme ? 'text-[#EBB700]' : 'text-[#00338D]'} size={24} />
            </div>
            <div>
              <p className={`font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>{doc.name}</p>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className={isDarkTheme ? 'text-gray-500' : 'text-gray-500'}>{doc.date}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${
                  doc.status === 'Verified' 
                    ? (isDarkTheme ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                    : (isDarkTheme ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700')
                }`}>{doc.status}</span>
              </div>
            </div>
          </div>
          <button className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDarkTheme ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-white hover:shadow-md'}`}>
            <Eye size={18} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const NotificationsTab = ({ isDarkTheme }) => (
  <div className={`p-8 rounded-3xl border ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'} animate-[slideFadeIn_0.4s_ease-out_forwards]`}>
    <h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Notifications</h2>
    <div className="space-y-4">
      <div className={`p-4 border-l-4 border-[#00338D] rounded-r-xl ${isDarkTheme ? 'bg-[#2A2A2A]' : 'bg-blue-50'}`}>
        <p className={`font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Interview Scheduled</p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Your interview has been scheduled for 15 Aug 2026 at 20:30 IST.</p>
        <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
      </div>
      <div className={`p-4 border-l-4 border-[#EBB700] rounded-r-xl ${isDarkTheme ? 'bg-[#2A2A2A]' : 'bg-yellow-50'}`}>
        <p className={`font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Application Submitted</p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>We have received your application and it is currently under review.</p>
        <p className="text-xs text-gray-400 mt-2">1 day ago</p>
      </div>
    </div>
  </div>
);

export default MemberPortalApp;
