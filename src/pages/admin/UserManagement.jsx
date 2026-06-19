import React, { useState, useMemo } from 'react';

const UserManagement = () => {
  // Mock Donor Data
  const donors = [
    { id: 1, name: 'Alice Smith', bloodGroup: 'O+', district: 'North', type: 'Whole Blood', active: true, lastDonation: '2023-10-12', contact: '555-1111' },
    { id: 2, name: 'Bob Johnson', bloodGroup: 'A-', district: 'South', type: 'SDP', active: true, lastDonation: '2023-05-20', contact: '555-2222' },
    { id: 3, name: 'Charlie Brown', bloodGroup: 'O+', district: 'North', type: 'Whole Blood', active: false, lastDonation: '2024-01-05', contact: '555-3333' },
    { id: 4, name: 'Diana Prince', bloodGroup: 'B+', district: 'East', type: 'Plasma', active: true, lastDonation: '2023-12-15', contact: '555-4444' },
    { id: 5, name: 'Evan Wright', bloodGroup: 'O+', district: 'North', type: 'SDP', active: true, lastDonation: '2023-08-21', contact: '555-5555' },
    { id: 6, name: 'Fiona Gallagher', bloodGroup: 'AB-', district: 'West', type: 'Whole Blood', active: false, lastDonation: '2024-02-10', contact: '555-6666' },
  ];

  const [filters, setFilters] = useState({
    bloodGroup: '',
    district: '',
    type: '',
    activeOnly: false,
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Efficient filtering logic
  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const matchBloodGroup = !filters.bloodGroup || donor.bloodGroup === filters.bloodGroup;
      const matchDistrict = !filters.district || donor.district === filters.district;
      const matchType = !filters.type || donor.type === filters.type;
      const matchActive = !filters.activeOnly || donor.active === true;
      return matchBloodGroup && matchDistrict && matchType && matchActive;
    });
  }, [donors, filters]);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 mt-1">Filter, search, and manage registered donors.</p>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Search & Filter Donors</h2>
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
            <div className="flex items-center h-10 bg-gray-50 border border-gray-200 rounded-lg px-4">
              <input type="checkbox" name="activeOnly" id="activeOnly" checked={filters.activeOnly} onChange={handleFilterChange} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
              <label htmlFor="activeOnly" className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer">Show Active Cases Only</label>
            </div>
          </div>
        </div>

        {/* Donors Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Donor Directory</h2>
            <span className="text-sm text-gray-500">{filteredDonors.length} donors found</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm">
                  <th className="py-3 px-4 font-medium">Donor Name</th>
                  <th className="py-3 px-4 font-medium">Contact</th>
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
                    <td colSpan="8" className="py-8 text-center text-gray-500">No donors match your filter criteria.</td>
                  </tr>
                ) : (
                  filteredDonors.map(donor => (
                    <tr key={donor.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4 text-gray-800 font-medium">{donor.name}</td>
                      <td className="py-4 px-4 text-gray-600">{donor.contact}</td>
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
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline mr-3">View</button>
                        <button className="text-red-600 hover:text-red-800 font-medium text-sm hover:underline">Notify</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;