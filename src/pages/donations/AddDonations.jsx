import React, { useState } from 'react';

const AddDonation = () => {
  const [formData, setFormData] = useState({
    date: '',
    hospital: '',
    donationType: 'Whole Blood',
    systolic: '',
    diastolic: '',
    weight: '',
    hemoglobin: '',
    pulse: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine BP into a single string for database/formatting purposes
    const submissionData = {
      ...formData,
      bloodPressure: `${formData.systolic}/${formData.diastolic} mmHg`,
      weight: `${formData.weight} kg`,
      hemoglobin: `${formData.hemoglobin} g/dL`,
      pulse: `${formData.pulse} bpm`
    };

    // Log the formatted data (Replace with actual API call)
    console.log('Donation Data Submitted:', submissionData);
    
    // Show success message
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        date: '', hospital: '', donationType: 'Whole Blood', systolic: '', diastolic: '', weight: '', hemoglobin: '', pulse: '', notes: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Log New Donation</h1>
          <p className="text-gray-500 mt-2">Track your health metrics and donation history by adding your latest contribution.</p>
        </div>

        {/* Success Banner */}
        {isSubmitted && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-medium">Donation successfully recorded! Thank you for saving lives.</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border-t-4 border-red-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Date & Hospital */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Donation <span className="text-red-500">*</span>
                </label>
                <input
                  id="date" name="date" type="date" required
                  value={formData.date} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital / Donation Center <span className="text-red-500">*</span>
                </label>
                <input
                  id="hospital" name="hospital" type="text" required placeholder="e.g., General City Hospital"
                  value={formData.hospital} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Row 2: Donation Type & Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="donationType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Donation <span className="text-red-500">*</span>
                </label>
                <select
                  id="donationType" name="donationType" required
                  value={formData.donationType} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="SDP">SDP (Single Donor Platelets)</option>
                  <option value="WBC">WBC (White Blood Cells)</option>
                  <option value="Plasma">Plasma</option>
                </select>
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  id="weight" name="weight" type="number" step="0.1" min="40" required placeholder="e.g., 75.5"
                  value={formData.weight} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Row 3: Blood Pressure (Split Input) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Pressure (mmHg) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    id="systolic" name="systolic" type="number" required placeholder="Systolic (e.g., 120)"
                    value={formData.systolic} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <span className="text-gray-500 font-bold text-2xl">/</span>
                <div className="flex-1">
                  <input
                    id="diastolic" name="diastolic" type="number" required placeholder="Diastolic (e.g., 80)"
                    value={formData.diastolic} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Hemoglobin & Pulse */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hemoglobin" className="block text-sm font-medium text-gray-700 mb-1">
                  Hemoglobin (g/dL) <span className="text-red-500">*</span>
                </label>
                <input
                  id="hemoglobin" name="hemoglobin" type="number" step="0.1" required placeholder="e.g., 14.5"
                  value={formData.hemoglobin} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="pulse" className="block text-sm font-medium text-gray-700 mb-1">
                  Pulse Rate (bpm) <span className="text-red-500">*</span>
                </label>
                <input
                  id="pulse" name="pulse" type="number" required placeholder="e.g., 72"
                  value={formData.pulse} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Row 5: Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                id="notes" name="notes" rows="3" placeholder="Any reactions post-donation, feelings of fatigue, or notes from the nurse..."
                value={formData.notes} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold shadow-sm transition flex items-center justify-center gap-2 order-1 sm:order-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Save Donation
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDonation;