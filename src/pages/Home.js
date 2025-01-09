import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Monitoring Gunung Merapi</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg mb-4">
          Selamat datang di sistem monitoring kebencanaan Gunung Merapi.
        </p>
        <div className="mt-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Lihat Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
