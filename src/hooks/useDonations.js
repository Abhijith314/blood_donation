import { useState, useEffect } from 'react';

export const useDonations = (userId) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch donations on mount or when userId changes
  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        // Simulate API call: GET /api/users/:userId/donations
        setTimeout(() => {
          const mockData = [
            { id: 1, date: '2023-12-05', hospital: 'City Hosp', type: 'Whole Blood', weight: 75, bp: '120/80' }
          ];
          setDonations(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonations();
  }, [userId]);

  const addDonation = async (donationData) => {
    setLoading(true);
    try {
      // Simulate API call: POST /api/donations
      return new Promise((resolve) => {
        setTimeout(() => {
          const newDonation = { ...donationData, id: Date.now() };
          setDonations((prev) => [...prev, newDonation]);
          setLoading(false);
          resolve(newDonation);
        }, 800);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { donations, loading, error, addDonation };
};