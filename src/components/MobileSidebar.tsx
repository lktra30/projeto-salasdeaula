'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AlunosSidebar } from '@/components/AlunosSidebar';

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão do menu mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full">
          {/* Botão fechar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-lg shadow-md border border-gray-200"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Conteúdo da sidebar */}
          <AlunosSidebar />
        </div>
      </div>
    </>
  );
}