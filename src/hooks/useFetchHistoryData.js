import { useState, useEffect } from 'react';

export const useFetchHistoryData = (token) => {
  const [stories, setStories] = useState(null);
  const [dialogs, setDialogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://k8s-default-ingressn-3e4c502731-1968576031.us-east-1.elb.amazonaws.com/stories", {
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
        const response = await fetch("http://127.0.0.1:8001/dialogs", {
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
