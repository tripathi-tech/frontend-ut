import { useState } from 'react';

export const useDownload = () => {
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadVideo = async (youtubeUrl) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://f-app12.vercel.app/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtube_url: youtubeUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        const videoFileName = data.file;

        // Fetch the file using the returned filename
        const fileResponse = await fetch(`https://f-app12.vercel.app/file?filename=${videoFileName}`);
        if (fileResponse.ok) {
          setFileDownloadUrl(`https://f-app12.vercel.app/file?filename=${videoFileName}`);
        } else {
          setError('File not available for download');
        }
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return { downloadVideo, fileDownloadUrl, loading, error };
};

