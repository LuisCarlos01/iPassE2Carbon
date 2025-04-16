export default function Footer() {
  return (
    <footer className="bg-[#02ab89] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coluna da esquerda - Informações adicionais */}
          <div>
            <h3 className="text-base font-medium uppercase mb-3">Informações adicionais</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://ipass.com.br/quem-somos" className="hover:underline">Quem Somos</a>
              </li>
              <li>
                <a href="https://ipass.com.br/termos-de-uso" className="hover:underline">Termos de Uso</a>
              </li>
              <li>
                <a href="https://ipass.com.br/fale-conosco" className="hover:underline">Fale Conosco</a>
              </li>
              <li>
                <a href="https://ipass.com.br/politica-de-privacidade" className="hover:underline">Política de Privacidade</a>
              </li>
            </ul>
          </div>

          {/* Coluna da direita - Logo */}
          <div className="flex flex-col items-end justify-between">
            <div className="flex items-center">
              <img src="/assets/logos/Ipass_logo.png" alt="iPass Logo" className="h-8 w-auto" />
              <img src="/assets/logos/E2carbon.png" alt="E2Carbon Logo" className="h-8 w-auto ml-2" />
            </div>
            
            {/* Ícone do Instagram */}
            <div className="mt-2">
              <a href="https://www.instagram.com/ipass.oficial/" className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-6">
          <p className="text-xs">
            &copy; 2015 - {new Date().getFullYear()} TODOS OS DIREITOS RESERVADOS
          </p>
        </div>
      </div>
    </footer>
  );
}
