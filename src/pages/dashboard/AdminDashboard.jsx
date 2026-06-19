import React, { useState, useMemo } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('postRequirement');

  // --- STATE: POST REQUIREMENT FORM ---
  const [reqForm, setReqForm] = useState({
    patientName: '',
    case: '',
    hospitalName: '',
    hospitalId: '',
    age: '',
    bloodGroup: '',
    type: 'Whole Blood',
    units: 1,
    bystanderName: '',
    contactNumber: '',
  });

  // --- STATE: POSTED REQUIREMENTS ---
  const [requirements, setRequirements] = useState([
    { id: 1, patientName: 'John Doe', case: 'Surgery', hospitalName: 'City Hospital', hospitalId: 'HOSP-001', age: '45', bloodGroup: 'O+', type: 'Whole Blood', units: 2, bystanderName: 'Jane Doe', contactNumber: '555-0101' }
  ]);

  // --- STATE: DONOR FILTERS ---
  const [filters, setFilters] = useState({
    bloodGroup: '',
    district: '',
    type: '',
    activeOnly: false,
  });

  // --- MOCK DATA: DONORS DATABASE ---
  const donors = [
    { id: 1, name: 'Alice Smith', bloodGroup: 'O+', district: 'North', type: 'Whole Blood', active: true, lastDonation: '2023-10-12' },
    { id: 2, name: 'Bob Johnson', bloodGroup: 'A-', district: 'South', type: 'SDP', active: true, lastDonation: '2023-05-20' },
    { id: 3, name: 'Charlie Brown', bloodGroup: 'O+', district: 'North', type: 'Whole Blood', active: false, lastDonation: '2024-01-05' },
    { id: 4, name: 'Diana Prince', bloodGroup: 'B+', district: 'East', type: 'Plasma', active: true, lastDonation: '2023-12-15' },
    { id: 5, name: 'Evan Wright', bloodGroup: 'O+', district: 'North', type: 'SDP', active: true, lastDonation: '2023-08-21' },
    { id: 6, name: 'Fiona Gallagher', bloodGroup: 'AB-', district: 'West', type: 'Whole Blood', active: false, lastDonation: '2024-02-10' },
  ];

  // --- HANDLERS ---
  const handleReqChange = (e) => {
    const { name, value } = e.target;
    setReqForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleReqSubmit = (e) => {
    e.preventDefault();
    setRequirements((prev) => [{ ...reqForm, id: prev.length + 1, age: reqForm.age || 'N/A' }, ...prev]);
    // Reset form
    setReqForm({
      patientName: '', case: '', hospitalName: '', hospitalId: '', age: '', bloodGroup: '', type: 'Whole Blood', units: 1, bystanderName: '', contactNumber: ''
    });
    alert('Requirement posted successfully!');
  };

  // --- MEMOIZED FILTERED DONORS ---
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchBloodGroup = !filters.bloodGroup || donor.bloodGroup === filters.bloodGroup;
      const matchDistrict = !filters.district || donor.district === filters.district;
      const matchType = !filters.type || donor.type === filters.type;
      const matchActive = !filters.activeOnly || donor.active === true;
      return matchBloodGroup && matchDistrict && matchType && matchActive;
    });
  }, [donors, filters]);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Top Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 8 5 12 5 15a7 7 0 0 0 14 0c0-3-2.5-7-7-13z"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">LifeFlow Blood Management System</p>
            </div>
          </div>
          <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm w-full md:w-auto md:inline-flex">
          <button
            onClick={() => setActiveTab('postRequirement')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'postRequirement' ? 'bg-red-600 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Post Requirement
          </button>
          <button
            onClick={() => setActiveTab('filterDonors')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'filterDonors' ? 'bg-red-600 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Filter & Find Donors
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: POST REQUIREMENT */}
        {activeTab === 'postRequirement' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">New Blood Requirement</h2>
              <form onSubmit={handleReqSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input type="text" name="patientName" required value={reqForm.patientName} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case / Reason</label>
                    <input type="text" name="case" required placeholder="e.g., Surgery, Anemia" value={reqForm.case} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                    <input type="text" name="hospitalName" required value={reqForm.hospitalName} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital ID</label>
                    <input type="text" name="hospitalId" required value={reqForm.hospitalId} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age <span className="text-gray-400 text-xs">(Optional)</span></label>
                    <input type="number" name="age" value={reqForm.age} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select name="bloodGroup" required value={reqForm.bloodGroup} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                      <option value="" disabled>Select</option>
                      <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="type" required value={reqForm.type} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                      <option>Whole Blood</option><option>SDP</option><option>WBC</option><option>Plasma</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Units</label>
                  <input type="number" name="units" min="1" required value={reqForm.units} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bystander Name</label>
                    <input type="text" name="bystanderName" required value={reqForm.bystanderName} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input type="tel" name="contactNumber" required placeholder="+1 234 567 890" value={reqForm.contactNumber} onChange={handleReqChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition shadow-sm">
                  Post Requirement
                </button>
              </form>
            </div>

            {/* Active Requirements List */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 h-fit lg:sticky lg:top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Requirements</h2>
              <div className="space-y-4 max-h-150 overflow-y-auto pr-2">
                {requirements.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No active requirements.</p>
                ) : (
                  requirements.map((req) => (
                    <div key={req.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800">{req.patientName} <span className="text-gray-400 font-normal text-sm">({req.age})</span></h3>
                          <p className="text-sm text-gray-500">{req.case}</p>
                        </div>
                        <span className="bg-red-100 text-red-700 font-bold text-sm px-3 py-1 rounded-full">
                          {req.bloodGroup} ({req.units}u)
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Hospital:</span> {req.hospitalName} ({req.hospitalId})</p>
                        <p><span className="font-medium">Bystander:</span> {req.bystanderName} - {req.contactNumber}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: FILTER DONORS */}
        {activeTab === 'filterDonors' && (
          <div className="space-y-6">
            
            {/* Filter Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Filter Donors</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select name="bloodGroup" value={filters.bloodGroup} onChange={handleFilterChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                    <option value="">All Groups</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <select name="district" value={filters.district} onChange={handleFilterChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                    <option value="">All Districts</option>
                    <option>North</option><option>South</option><option>East</option><option>West</option><option>Central</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type</label>
                  <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                    <option value="">All Types</option>
                    <option>Whole Blood</option><option>SDP</option><option>WBC</option><option>Plasma</option>
                  </select>
                </div>
                <div className="flex items-center h-10">
                  <input type="checkbox" name="activeOnly" checked={filters.activeOnly} onChange={handleFilterChange} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm font-medium text-gray-700">Show Active Cases Only</label>
                </div>
              </div>
            </div>

            {/* Filtered Donors Table */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Matching Donors <span className="text-gray-400 font-normal">({filteredDonors.length} found)</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-175">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-sm">
                      <th className="py-3 px-4 font-medium">Donor Name</th>
                      <th className="py-3 px-4 font-medium">Blood Group</th>
                      <th className="py-3 px-4 font-medium">District</th>
                      <th className="py-3 px-4 font-medium">Preferred Type</th>
                      <th className="py-3 px-4 font-medium">Last Donation</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonors.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-8 text-center text-gray-500">No donors match your criteria.</td>
                      </tr>
                    ) : (
                      filteredDonors.map((donor) => (
                        <tr key={donor.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-4 px-4 text-gray-800 font-medium">{donor.name}</td>
                          <td className="py-4 px-4">
                            <span className="bg-red-50 text-red-700 font-bold text-xs px-2.5 py-1 rounded-full">{donor.bloodGroup}</span>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{donor.district}</td>
                          <td className="py-4 px-4 text-gray-600">{donor.type}</td>
                          <td className="py-4 px-4 text-gray-600">{donor.lastDonation}</td>
                          <td className="py-4 px-4">
                            {donor.active ? (
                              <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-gray-400 text-sm font-medium">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span> Inactive
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-red-600 hover:text-red-700 font-medium text-sm hover:underline">Notify</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;