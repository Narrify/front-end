import { useState, useEffect } from 'react';

export const useFetchHistoryData = (token) => {
  const [stories, setStories] = useState(null);
  const [dialogs, setDialogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("https://narrify.dev/stories", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Error obtaining stories: ', error);
      }
    };

    if (token) fetchStories();
  }, [token]);

  useEffect(() => {
    const fetchDialogs = async () => {
      try {
        const response = await fetch("https://narrify.dev/dialogs", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setDialogs(data);
      } catch (error) {
        console.error('Error obtaining dialogs: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchDialogs();
  }, [token]);

  return { stories, dialogs, loading };
};
