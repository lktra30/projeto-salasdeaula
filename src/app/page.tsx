'use client';

import { useSalaContext } from '@/context/SalaContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { salas, getCursoBySalaId, agendamentos } = useSalaContext();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-wide">
            Salas Vox2You
          </h1>
          <p className="text-lg text-gray-600 font-normal">
            Gerenciamento de Salas de Aula
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salas.map((sala) => {
            const curso = getCursoBySalaId(sala.id);
            const agendamento = agendamentos.find(a => a.salaId === sala.id);

            return (
              <Card key={sala.id} className="hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium text-gray-900">
                    {sala.nome}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {sala.capacidade} lugares • Layout quadrado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {curso && (
                    <div className="bg-gradient-to-r from-yellow-50 to-cyan-50 p-3 rounded-lg border">
                      <div className="text-sm font-medium text-gray-900">{curso.nome}</div>
                      <div className="text-xs text-gray-600">{curso.descricao}</div>
                    </div>
                  )}

                  {agendamento && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{agendamento.diaSemana}</span>
                      <span>{agendamento.horario}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quadro central</span>
                    <span>Máx. {sala.limites.aulas_experimentais} experimental</span>
                  </div>

                  <Link href={`/sala/${sala.id}`}>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-cyan-500 hover:from-yellow-600 hover:to-cyan-600 text-white font-normal">
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
  );
}