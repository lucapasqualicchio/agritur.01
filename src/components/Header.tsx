import { Mountain, Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-green-700" />
            <span className="text-2xl font-bold text-green-800">Agritur</span>
          </div>
          <a
            href="tel:3271131188"
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <Phone className="h-5 w-5" />
            <span className="hidden sm:inline">327 113 1188</span>
          </a>
        </div>
      </div>
    </header>
  );
}
