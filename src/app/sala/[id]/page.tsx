'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSalaContext } from '@/context/SalaContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, MouseEvent } from 'react';
import { Cadeira } from '@/types/auditorio';
export default function SalaPage() {
  const params = useParams();
  const router = useRouter();
  const { getSalaById, updateSala, getCursoBySalaId, getAlunosByCurso, resetToDefault } = useSalaContext();
  const salaId = params.id as string;
  
  const sala = getSalaById(salaId);
  const curso = getCursoBySalaId(salaId);

  const [limites, setLimites] = useState({
    aulas_experimentais: 0
  });

  const [modoSelecao, setModoSelecao] = useState<'matriculado' | 'aula_experimental' | null>(null);

  // Buscar alunos do curso dessa sala
  const alunosDoCurso = curso ? getAlunosByCurso(curso.id) : [];

  useEffect(() => {
    if (sala) {
      setLimites(sala.limites);
    }
  }, [sala]);

  if (!sala) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sala não encontrada</h1>
          <Button onClick={() => router.push('/')}>
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const cadeirasOrdenadas = [...sala.cadeiras].sort((a, b) => a.numero - b.numero);

  const handleLimiteChange = (tipo: keyof typeof limites, valor: string) => {
    const novoValor = parseInt(valor) || 0;
    if (novoValor >= 0) {
      setLimites(prev => ({
        ...prev,
        [tipo]: novoValor
      }));
    }
  };

  const salvarConfiguracoes = () => {
    const salaAtualizada = {
      ...sala,
      limites
    };
    updateSala(salaId, salaAtualizada);
    router.push('/');
  };

  const alterarTipoCadeira = (cadeiraId: string, novoTipo: Cadeira['tipo']) => {
    const cadeirasAtualizadas = sala.cadeiras.map(cadeira =>
      cadeira.id === cadeiraId ? { ...cadeira, tipo: novoTipo } : cadeira
    );

    const salaAtualizada = {
      ...sala,
      cadeiras: cadeirasAtualizadas
    };

    updateSala(salaId, salaAtualizada);
  };

  const contadorTipos = {
    matriculados: sala.cadeiras.filter(c => c.tipo === 'matriculado').length,
    aulas_experimentais: sala.cadeiras.filter(c => c.tipo === 'aula_experimental').length
  };


  const handleSeatClick = (cadeira: Cadeira) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!modoSelecao) {
      alert('Selecione um modo de selecao primeiro (Matriculado ou Aula Experimental)');
      return;
    }

    if (modoSelecao === 'aula_experimental') {
      const contagemAtual = sala.cadeiras.filter(
        (c) => c.tipo === 'aula_experimental' && c.id !== cadeira.id
      ).length;
      const limite = limites.aulas_experimentais;

      if (limite > 0 && contagemAtual >= limite) {
        alert(`Limite de ${limite} aulas experimentais atingido!`);
        return;
      }
    }

    alterarTipoCadeira(cadeira.id, modoSelecao);
  };

  const renderSeat = (cadeira: Cadeira) => {
    const seatClassName = [
      'w-10 h-10 flex items-center justify-center text-xs font-medium rounded cinema-seat',
      cadeira.tipo === 'matriculado' ? 'seat-matriculado' : '',
      cadeira.tipo === 'aula_experimental' ? 'seat-experimental' : ''
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        key={cadeira.id}
        className={seatClassName}
        title={`${cadeira.id} - ${cadeira.tipo}`}
        onClick={handleSeatClick(cadeira)}
      >
        {cadeira.numero}
      </button>
    );
  };


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="mb-4"
          >
            ← Voltar
          </Button>
          
          <Button 
            onClick={() => resetToDefault()}
            variant="outline"
            className="mb-4 ml-2 bg-red-100 text-red-700 hover:bg-red-200"
          >
            🔄 Resetar Cache
          </Button>
          
          <h1 className="text-3xl font-light text-gray-800 mb-2">
            {sala.nome}
          </h1>
          <p className="text-gray-600">
            Configuração de assentos {curso && `- ${curso.nome}`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">
                  Limites
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configure os limites por tipo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Modo de Seleção</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant={modoSelecao === 'matriculado' ? 'default' : 'outline'}
                      onClick={() => setModoSelecao(modoSelecao === 'matriculado' ? null : 'matriculado')}
                      className="text-xs bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Matriculado
                    </Button>
                    <Button
                      variant={modoSelecao === 'aula_experimental' ? 'default' : 'outline'}
                      onClick={() => setModoSelecao(modoSelecao === 'aula_experimental' ? null : 'aula_experimental')}
                      className="text-xs bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Aula Experimental
                    </Button>
                  </div>
                  {modoSelecao && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      Modo ativo: <strong>{modoSelecao === 'matriculado' ? 'MATRICULADO' : 'AULA EXPERIMENTAL'}</strong> - Clique nas cadeiras para definir como {modoSelecao === 'matriculado' ? 'matriculado' : 'aula experimental'}
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-medium text-gray-900">Limites</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="aulas_experimentais" className="text-sm">Aulas Experimentais</Label>
                      <Input
                        id="aulas_experimentais"
                        type="number"
                        min="0"
                        max="4"
                        value={limites.aulas_experimentais}
                        onChange={(e) => handleLimiteChange('aulas_experimentais', e.target.value)}
                        className="w-20 h-8 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={salvarConfiguracoes} className="w-full bg-gradient-to-r from-yellow-500 to-cyan-500 hover:from-yellow-600 hover:to-cyan-600 text-white">
                  Salvar
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Matriculados</span>
                    <span className="font-medium">{contadorTipos.matriculados}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aulas Experimentais</span>
                    <span className="font-medium">{contadorTipos.aulas_experimentais}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{sala.cadeiras.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Lista de Alunos */}
            {alunosDoCurso.length > 0 && (
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-gray-900">
                    Alunos do Curso
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {curso?.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
                    {alunosDoCurso.map((aluno) => (
                      <div key={aluno.id} className="flex justify-between items-center p-2 rounded border">
                        <div>
                          <div className="font-medium">{aluno.nome}</div>
                          <div className="text-xs text-gray-500">{aluno.email}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded ${
                            aluno.confirmado
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {aluno.confirmado ? 'Confirmado' : 'Pendente'}
                          </div>
                          {aluno.cadeira && (
                            <div className="text-xs text-gray-500 mt-1">
                              Cadeira: {aluno.cadeira}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">
                  Layout da Sala - 3 Fileiras
                </CardTitle>
                <CardDescription className="text-gray-600">
                  3 fileiras de 6 cadeiras (numeradas de 1 a 18)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Layout em Fileiras */}
                <div className="mb-6">
                  <div className="relative w-full max-w-2xl mx-auto">
                    {/* Layout das Cadeiras em 3 fileiras */}
                    <div
                      className="relative mx-auto border-2 border-dashed border-gray-300 rounded px-10 pt-16 pb-10"
                      style={{ width: '520px' }}
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-16 bg-gradient-to-r from-yellow-500 to-cyan-500 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-medium">QUADRO</span>
                      </div>

                      <div className="grid grid-cols-6 gap-x-6 gap-y-6 justify-items-center">
                        {cadeirasOrdenadas.map((cadeira) => renderSeat(cadeira))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legenda */}

                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-xs justify-center">
                    <div className="flex items-center gap-2">
                      <div className="cinema-seat seat-matriculado w-4 h-4"></div>
                      <span className="text-gray-600">Matriculado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="cinema-seat seat-experimental w-4 h-4"></div>
                      <span className="text-gray-600">Aula Experimental</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}