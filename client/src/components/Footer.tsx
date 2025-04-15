export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="header-logo">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#15803D" />
              <path d="M13 20H27M20 13V27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ml-2 text-lg font-semibold text-gray-900">iPass</span>
            <span className="ml-1 text-lg font-light text-green-600">E2Carbon</span>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} iPass. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
