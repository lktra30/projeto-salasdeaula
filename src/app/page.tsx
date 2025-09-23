'use client';

import { useSalaContext } from '@/context/SalaContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlunosSidebar } from '@/components/AlunosSidebar';
import { MobileSidebar } from '@/components/MobileSidebar';
import Link from 'next/link';

export default function Home() {
  const { salas, getCursoBySalaId, agendamentos } = useSalaContext();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block lg:w-64">
        <AlunosSidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 pb-4 lg:pb-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl lg:text-4xl font-light text-gray-800 mb-2 tracking-wide">
              Salas Vox2You
            </h1>
            <p className="text-base lg:text-lg text-gray-600 font-normal">
              Gerenciamento de Salas de Aula
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {salas.map((sala) => {
            const curso = getCursoBySalaId(sala.id);
            const agendamento = agendamentos.find(a => a.salaId === sala.id);

            return (
              <Card key={sala.id} className="hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-200">
                <CardHeader className="pb-3 lg:pb-4">
                  <CardTitle className="text-base lg:text-lg font-medium text-gray-900">
                    {sala.nome}
                  </CardTitle>
                  <CardDescription className="text-sm lg:text-base text-gray-600">
                    {sala.capacidade} lugares • Layout quadrado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  {curso && (
                    <div className="bg-gradient-to-r from-yellow-50 to-cyan-50 p-2 lg:p-3 rounded-lg border">
                      <div className="text-xs lg:text-sm font-medium text-gray-900">{curso.nome}</div>
                      <div className="text-xs text-gray-600 line-clamp-2">{curso.descricao}</div>
                    </div>
                  )}

                  {agendamento && (
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs lg:text-sm text-gray-600 gap-1 sm:gap-0">
                      <span className="font-medium">{agendamento.diaSemana}</span>
                      <span>{agendamento.horario}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 gap-1 sm:gap-0">
                    <span>Quadro central</span>
                    <span>Máx. {sala.limites.aulas_experimentais} experimental</span>
                  </div>

                  <Link href={`/sala/${sala.id}`}>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-cyan-500 hover:from-yellow-600 hover:to-cyan-600 text-white font-normal text-sm lg:text-base py-2 lg:py-3">
                      Configurar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}