import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, UserPlus, Users, Calendar, ShieldCheck, 
  Search, Filter, LogOut, FileText, CheckCircle, XCircle, MoreVertical, Eye
} from 'lucide-react';

const AdminPortalApp = ({ isDarkTheme, setIsAdminLoggedIn }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: UserPlus },
    { id: 'members', label: 'Members Directory', icon: Users },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: ShieldCheck }
  ];

  const handleSignOut = () => {
    setIsAdminLoggedIn(false);
    window.location.hash = 'home';
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      {/* Sidebar Desktop */}
      <div className={`hidden md:flex flex-col w-64 border-r ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#00338D] flex items-center justify-center text-white font-bold">L</div>
            <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Admin Portal</h2>
          </div>
          <p className={isDarkTheme ? 'text-green-400 text-sm font-bold' : 'text-green-600 text-sm font-bold'}>● Online</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
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
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <AdminDashboard isDarkTheme={isDarkTheme} />}
          {activeTab === 'applications' && <ApplicationsView isDarkTheme={isDarkTheme} />}
          {activeTab === 'members' && <MembersView isDarkTheme={isDarkTheme} />}
          {activeTab === 'interviews' && <InterviewsView isDarkTheme={isDarkTheme} />}
          {activeTab === 'settings' && <div className={isDarkTheme ? "text-white" : "text-black"}>Settings implementation pending</div>}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// VIEWS
// -------------------------------------------------------------

const AdminDashboard = ({ isDarkTheme }) => (
  <div className="animate-[slideFadeIn_0.4s_ease-out_forwards]">
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

    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-100'}`}>
      <h3 className={`text-xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Recent Activities</h3>
      <div className="space-y-4">
        {[
          { type: 'Application Submitted', user: 'Rahul Verma', time: '10 mins ago', icon: FileText, color: 'text-blue-500 bg-blue-100' },
          { type: 'Payment Verified', user: 'Simran Kaur', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500 bg-green-100' },
          { type: 'Interview Scheduled', user: 'Aman Sharma', time: '5 hours ago', icon: Calendar, color: 'text-yellow-600 bg-yellow-100' }
        ].map((act, i) => (
          <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${isDarkTheme ? 'bg-[#2A2A2A] border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.color}`}>
                <act.icon size={18} />
              </div>
              <div>
                <p className={`font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>{act.type}</p>
                <p className={isDarkTheme ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>{act.user}</p>
              </div>
            </div>
            <span className={isDarkTheme ? 'text-gray-500 text-xs font-bold' : 'text-gray-400 text-xs font-bold'}>{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ApplicationsView = ({ isDarkTheme }) => {
  const MOCK_APPS = [
    { id: 'APP-001', name: 'Arjun Gupta', plan: 'Fellowship', status: 'Pending Review', date: '2026-08-10' },
    { id: 'APP-002', name: 'Neha Singh', plan: 'Regular', status: 'Interview Scheduled', date: '2026-08-09' },
    { id: 'APP-003', name: 'Karan Patel', plan: 'Elite', status: 'Payment Pending', date: '2026-08-08' }
  ];

  return (
    <div className="animate-[slideFadeIn_0.4s_ease-out_forwards]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Applications</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
            <input type="text" placeholder="Search apps..." className={`w-full pl-10 pr-4 py-2 rounded-xl border outline-none ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-700 text-white focus:border-[#EBB700]' : 'bg-white border-gray-300 text-black focus:border-[#00338D]'}`} />
          </div>
          <button className={`p-2 rounded-xl border flex items-center justify-center ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-700 text-gray-300 hover:bg-gray-800' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={isDarkTheme ? 'bg-[#2A2A2A] border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'}>
                <th className={`px-6 py-4 text-sm font-bold uppercase tracking-wider ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>App ID</th>
                <th className={`px-6 py-4 text-sm font-bold uppercase tracking-wider ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Applicant</th>
                <th className={`px-6 py-4 text-sm font-bold uppercase tracking-wider ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Plan</th>
                <th className={`px-6 py-4 text-sm font-bold uppercase tracking-wider ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`px-6 py-4 text-sm font-bold uppercase tracking-wider ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                <th className={`px-6 py-4 text-sm font-bold uppercase tracking-wider text-right ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {MOCK_APPS.map((app, i) => (
                <tr key={i} className={`hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors`}>
                  <td className={`px-6 py-4 font-mono text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{app.id}</td>
                  <td className={`px-6 py-4 font-bold ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>{app.name}</td>
                  <td className={`px-6 py-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{app.plan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status.includes('Pending') ? (isDarkTheme ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800') :
                      app.status.includes('Scheduled') ? (isDarkTheme ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800') :
                      (isDarkTheme ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800')
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{app.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className={`p-2 rounded-lg transition-colors ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-[#00338D]'}`}>
                      <Eye size={18} />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-[#00338D]'}`}>
                      <CheckCircle size={18} className="text-green-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MembersView = ({ isDarkTheme }) => (
  <div className="animate-[slideFadeIn_0.4s_ease-out_forwards]">
    <h1 className={`text-3xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Members Directory</h1>
    <div className={`p-10 rounded-2xl border text-center ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
      <Users size={48} className={`mx-auto mb-4 ${isDarkTheme ? 'text-gray-600' : 'text-gray-300'}`} />
      <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Directory Coming Soon</h3>
      <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>Manage active members and roles here.</p>
    </div>
  </div>
);

const InterviewsView = ({ isDarkTheme }) => (
  <div className="animate-[slideFadeIn_0.4s_ease-out_forwards]">
    <h1 className={`text-3xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Interview Management</h1>
    <div className={`p-10 rounded-2xl border text-center ${isDarkTheme ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
      <Calendar size={48} className={`mx-auto mb-4 ${isDarkTheme ? 'text-gray-600' : 'text-gray-300'}`} />
      <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-[#172033]'}`}>Scheduler Coming Soon</h3>
      <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>Manage available interview slots and assign interviewers here.</p>
    </div>
  </div>
);

export default AdminPortalApp;
