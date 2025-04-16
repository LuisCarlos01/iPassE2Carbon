import { useAppContext } from "../context/AppContext";

// Importe as imagens dos logos
export default function Header() {
  const { user } = useAppContext();

  return (
    <header className="bg-[#02ab89] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="header-logo flex items-center">
          <img src="/assets/logos/Ipass_logo.png" alt="iPass Logo" className="h-8 w-auto" />
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="text-sm text-white hidden sm:block">
              Olá, <span className="font-medium">{user.name}</span>
            </div>
          )}
          <button type="button" className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
