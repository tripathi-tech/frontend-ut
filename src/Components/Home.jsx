import React, { useState } from 'react';
import { useDownload } from './useDownload';

const DownloadVideo = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const { downloadVideo, fileDownloadUrl, loading, error } = useDownload();

  const handleSubmit = (e) => {
    e.preventDefault();
    downloadVideo(youtubeUrl);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Download YouTube Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">YouTube URL</label>
          <input
            type="text"
            id="youtubeUrl"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Downloading...' : 'Download'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {fileDownloadUrl && (
        <a
          href={fileDownloadUrl}
          className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700"
          download
        >
          Download Video
        </a>
      )}
    </div>
  );
};

export default DownloadVideo;
