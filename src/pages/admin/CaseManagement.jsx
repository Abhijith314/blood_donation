import React, { useState } from 'react';

const CaseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cases, setCases] = useState([
    { id: 'CASE-001', patientName: 'John Doe', case: 'Surgery', hospitalName: 'City Hospital', hospitalId: 'HOSP-01', age: '45', bloodGroup: 'O+', type: 'Whole Blood', units: 2, bystanderName: 'Jane Doe', contactNumber: '555-0101', status: 'Active' },
    { id: 'CASE-002', patientName: 'Alice Smith', case: 'Anemia', hospitalName: 'General Medical', hospitalId: 'HOSP-02', age: '28', bloodGroup: 'B+', type: 'SDP', units: 1, bystanderName: 'Bob Smith', contactNumber: '555-0102', status: 'Fulfilled' },
  ]);

  const [formData, setFormData] = useState({
    patientName: '', case: '', hospitalName: '', hospitalId: '', age: '', bloodGroup: '', type: 'Whole Blood', units: 1, bystanderName: '', contactNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCase = {
      ...formData,
      id: `CASE-${String(cases.length + 1).padStart(3, '0')}`,
      age: formData.age || 'N/A',
      status: 'Active'
    };
    setCases([newCase, ...cases]);
    setFormData({ patientName: '', case: '', hospitalName: '', hospitalId: '', age: '', bloodGroup: '', type: 'Whole Blood', units: 1, bystanderName: '', contactNumber: '' });
    setIsModalOpen(false);
  };

  const toggleStatus = (id) => {
    setCases(cases.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Fulfilled' : 'Active' } : c));
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Case Management</h1>
            <p className="text-gray-500 mt-1">Manage and track all blood donation requests.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition shadow-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Post New Requirement
          </button>
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="py-3 px-4 font-medium">Case ID</th>
                <th className="py-3 px-4 font-medium">Patient / Age</th>
                <th className="py-3 px-4 font-medium">Hospital</th>
                <th className="py-3 px-4 font-medium">Requirement</th>
                <th className="py-3 px-4 font-medium">Bystander / Contact</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4 text-gray-800 font-mono text-sm">{c.id}</td>
                  <td className="py-4 px-4 text-gray-800 font-medium">{c.patientName} <span className="text-gray-400 text-sm">({c.age})</span><br/><span className="text-gray-500 text-sm font-normal">{c.case}</span></td>
                  <td className="py-4 px-4 text-gray-600">{c.hospitalName}<br/><span className="text-gray-400 text-sm">{c.hospitalId}</span></td>
                  <td className="py-4 px-4">
                    <span className="bg-red-50 text-red-700 font-bold text-xs px-2.5 py-1 rounded-full">{c.bloodGroup} ({c.units}u)</span>
                    <br/><span className="text-gray-500 text-sm">{c.type}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{c.bystanderName}<br/><span className="text-gray-500 text-sm">{c.contactNumber}</span></td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === 'Active' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button onClick={() => toggleStatus(c.id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                      Mark as {c.status === 'Active' ? 'Fulfilled' : 'Active'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Requirement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 p-6 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">Post New Blood Requirement</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input type="text" name="patientName" required value={formData.patientName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case / Reason</label>
                  <input type="text" name="case" required placeholder="e.g., Surgery" value={formData.case} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                  <input type="text" name="hospitalName" required value={formData.hospitalName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital ID</label>
                  <input type="text" name="hospitalId" required value={formData.hospitalId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age <span className="text-gray-400 text-xs">(Opt)</span></label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select name="bloodGroup" required value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                    <option value="" disabled>Select</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select name="type" required value={formData.type} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white">
                    <option>Whole Blood</option><option>SDP</option><option>WBC</option><option>Plasma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                  <input type="number" name="units" min="1" required value={formData.units} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bystander Name</label>
                  <input type="text" name="bystanderName" required value={formData.bystanderName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input type="tel" name="contactNumber" required value={formData.contactNumber} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold shadow-sm transition">Save Case</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;