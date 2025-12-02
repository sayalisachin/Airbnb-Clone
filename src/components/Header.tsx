import { Search, Globe, Menu, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-rose-500">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 1c2 0 3.46.96 4.75 3.27C22.2 6.68 22.73 9 23.5 9c.38 0 1.45-.5 3-1.5 1.66-1.08 2.97-1.5 4.5-1.5 2.5 0 4 1.7 4 4.5 0 2.5-1.55 5.16-4.64 7.97-3 2.73-6.5 5-9.64 7.53a1 1 0 0 1-1.44 0c-3.14-2.53-6.64-4.8-9.64-7.53C6.55 16.66 5 14 5 11.5 5 8.7 6.5 7 9 7c1.53 0 2.84.42 4.5 1.5C15.05 9.5 16.12 10 16.5 10c.77 0 1.3-2.32 2.75-4.73C20.54 2.96 22 2 24 2h-8z"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-rose-500">airbnb</span>
          </div>

          <div className="hidden md:flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <span className="text-sm font-medium px-4 border-r border-gray-300">Anywhere</span>
            <span className="text-sm font-medium px-4 border-r border-gray-300">Any week</span>
            <span className="text-sm text-gray-600 px-4">Add guests</span>
            <div className="bg-rose-500 rounded-full p-2 ml-2">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium hover:bg-gray-50 rounded-full px-4 py-3 transition-colors">
              Airbnb your home
            </button>
            <button className="hover:bg-gray-50 rounded-full p-3 transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 border border-gray-300 rounded-full py-2 px-3 hover:shadow-md transition-shadow cursor-pointer">
              <Menu className="w-4 h-4" />
              <div className="bg-gray-600 rounded-full p-1">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
