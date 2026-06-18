import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  // Mock User Data
  const user = {
    name: 'John Doe',
    bloodType: 'O+',
    age: 28,
    gender: 'Male',
    city: 'New York',
    totalDonations: 4,
    livesSaved: 12, // 1 donation = 3 lives
    lastDonation: 'Dec 05, 2023',
    nextEligible: 'Mar 05, 2024',
  };

  // Mock Donation History with Health Parameters
  const donationHistory = [
    { id: 1, date: 'Jan 15, 2023', weight: 75, systolic: 120, diastolic: 80, pulse: 72, hemoglobin: 14.5, location: 'Central Blood Bank' },
    { id: 2, date: 'Apr 20, 2023', weight: 74, systolic: 118, diastolic: 78, pulse: 68, hemoglobin: 15.0, location: 'Red Cross Drive' },
    { id: 3, date: 'Aug 10, 2023', weight: 76, systolic: 122, diastolic: 82, pulse: 75, hemoglobin: 14.2, location: 'City Hospital' },
    { id: 4, date: 'Dec 05, 2023', weight: 75, systolic: 120, diastolic: 80, pulse: 70, hemoglobin: 14.8, location: 'Community Center' },
  ];

  // Reverse data for the chart so dates read left to right (oldest to newest)
  const chartData = [...donationHistory].reverse().map(d => ({
    date: d.date.split(',')[0], // "Jan 15"
    Systolic: d.systolic,
    Diastolic: d.diastolic,
    Pulse: d.pulse,
    Weight: d.weight,
  }));

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="md:w-64 bg-white shadow-md shrink-0">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-2xl font-bold text-red-600">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 8 5 12 5 15a7 7 0 0 0 14 0c0-3-2.5-7-7-13z"/></svg>
            LifeFlow
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition ${activeTab === 'overview' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition ${activeTab === 'history' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            Donation History
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition ${activeTab === 'profile' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Profile
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-gray-500 mt-1">Here is your donation summary and health tracking.</p>
          </div>
          <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition shadow-sm flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Find Donation Center
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-red-500">
            <p className="text-gray-500 text-sm font-medium mb-1">Total Donations</p>
            <p className="text-3xl font-bold text-gray-800">{user.totalDonations}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-green-500">
            <p className="text-gray-500 text-sm font-medium mb-1">Lives Saved</p>
            <p className="text-3xl font-bold text-gray-800">{user.livesSaved}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500">
            <p className="text-gray-500 text-sm font-medium mb-1">Blood Type</p>
            <p className="text-3xl font-bold text-gray-800">{user.bloodType}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-yellow-500">
            <p className="text-gray-500 text-sm font-medium mb-1">Next Eligible</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{user.nextEligible}</p>
          </div>
        </div>

        {/* Health Parameters Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Health Trends</h2>
          <p className="text-sm text-gray-500 mb-6">Vitals recorded during your past donations</p>
          
          {/* Recharts Implementation */}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Systolic" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Diastolic" stroke="#f97316" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Pulse" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Weight" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donation History Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Previous Donation Details</h2>
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium">Weight (kg)</th>
                <th className="py-3 px-4 font-medium">Blood Pressure</th>
                <th className="py-3 px-4 font-medium">Pulse (bpm)</th>
                <th className="py-3 px-4 font-medium">Hemoglobin (g/dL)</th>
              </tr>
            </thead>
            <tbody>
              {[...donationHistory].reverse().map((donation) => (
                <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4 text-gray-800 font-medium">{donation.date}</td>
                  <td className="py-4 px-4 text-gray-600">{donation.location}</td>
                  <td className="py-4 px-4 text-gray-600">{donation.weight}</td>
                  <td className="py-4 px-4 text-gray-600">
                    <span className="inline-flex items-center justify-center bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {donation.systolic}/{donation.diastolic} mmHg
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{donation.pulse}</td>
                  <td className="py-4 px-4 text-gray-600">{donation.hemoglobin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </main>
    </div>
  );
};

export default UserDashboard;