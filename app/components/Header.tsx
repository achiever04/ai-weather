import { useState } from 'react';
import { WiDaySunny } from 'react-icons/wi';

interface HeaderProps {
  onSearchLocation: (location: string) => void;
}

export default function Header({ onSearchLocation }: HeaderProps) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearchLocation(location);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <WiDaySunny className="text-yellow-300 text-4xl mr-2" />
          <h1 className="text-white text-2xl font-bold">AI Weather Prediction</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full md:w-auto">
          <div className="flex">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (city, country)"
              className="px-4 py-2 rounded-l-lg w-full md:w-64 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-r-lg hover:bg-yellow-300 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </header>
  );
} 