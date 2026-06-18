import React, { useState } from 'react';

const DonationHistory = () => {
  // Initial mock data for past donations
  const initialDonations = [
    { id: 1, date: '2023-12-05', hospital: 'Community Center', donationType: 'Whole Blood', bp: '120/80', weight: 75, hemoglobin: 14.8 },
    { id: 2, date: '2023-08-10', hospital: 'City Hospital', donationType: 'SDP', bp: '122/82', weight: 76, hemoglobin: 14.2 },
    { id: 3, date: '2023-04-20', hospital: 'Red Cross Drive', donationType: 'Whole Blood', bp: '118/78', weight: 74, hemoglobin: 15.0 },
  ];

  const [donations, setDonations] = useState(initialDonations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state for new donation
  const [formData, setFormData] = useState({
    date: '',
    hospital: '',
    donationType: 'Whole Blood',
    systolic: '',
    diastolic: '',
    weight: '',
    hemoglobin: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newDonation = {
      id: donations.length + 1,
      date: formData.date,
      hospital: formData.hospital,
      donationType: formData.donationType,
      bp: `${formData.systolic}/${formData.diastolic}`,
      weight: parseFloat(formData.weight),
      hemoglobin: parseFloat(formData.hemoglobin),
    };

    // Prepend new donation to the top of the list and sort by date descending
    const updatedDonations = [...donations, newDonation].sort((a, b) => new Date(b.date) - new Date(a.date));
    setDonations(updatedDonations);
    
    // Reset form and close modal
    setFormData({
      date: '', hospital: '', donationType: 'Whole Blood', systolic: '', diastolic: '', weight: '', hemoglobin: ''
    });
    setIsModalOpen(false);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Badge color based on donation type
  const getBadgeColor = (type) => {
    switch (type) {
      case 'Whole Blood': return 'bg-red-100 text-red-700';
      case 'SDP': return 'bg-blue-100 text-blue-700';
      case 'WBC': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Donation History</h1>
            <p className="text-gray-500 mt-1">Track and manage your previous blood donations.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition shadow-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Add Latest Donation
          </button>
        </div>

        {/* History Table Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Previous Records</h2>
          
          {donations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No donations recorded yet. Click "Add Latest Donation" to start.
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm">
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Hospital / Center</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Blood Pressure</th>
                  <th className="py-3 px-4 font-medium">Weight (kg)</th>
                  <th className="py-3 px-4 font-medium">Hemoglobin (g/dL)</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 text-gray-800 font-medium">{formatDate(donation.date)}</td>
                    <td className="py-4 px-4 text-gray-600">{donation.hospital}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold ${getBadgeColor(donation.donationType)}`}>
                        {donation.donationType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-mono">{donation.bp} mmHg</td>
                    <td className="py-4 px-4 text-gray-600">{donation.weight}</td>
                    <td className="py-4 px-4 text-gray-600">{donation.hemoglobin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-6 sticky top-0 bg-white rounded-t-xl z-10">
              <h3 className="text-xl font-bold text-gray-800">Add Latest Donation</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Date & Hospital */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Donation</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={formData.date} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital / Center</label>
                  <input 
                    type="text" 
                    name="hospital" 
                    required 
                    placeholder="e.g., General Hospital" 
                    value={formData.hospital} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" 
                  />
                </div>
              </div>

              {/* Donation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Donation</label>
                <select 
                  name="donationType" 
                  required 
                  value={formData.donationType} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="SDP">SDP (Single Donor Platelets)</option>
                  <option value="WBC">WBC (White Blood Cells)</option>
                  <option value="Plasma">Plasma</option>
                </select>
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (mmHg)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    name="systolic" 
                    required 
                    placeholder="Systolic (e.g., 120)" 
                    value={formData.systolic} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" 
                  />
                  <span className="text-gray-500 font-bold text-xl">/</span>
                  <input 
                    type="number" 
                    name="diastolic" 
                    required 
                    placeholder="Diastolic (e.g., 80)" 
                    value={formData.diastolic} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" 
                  />
                </div>
              </div>

              {/* Weight & Hemoglobin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    name="weight" 
                    required 
                    placeholder="e.g., 75.5" 
                    value={formData.weight} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hemoglobin (g/dL)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    name="hemoglobin" 
                    required 
                    placeholder="e.g., 14.5" 
                    value={formData.hemoglobin} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" 
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold shadow-sm transition"
                >
                  Save Donation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;