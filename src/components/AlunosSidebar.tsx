'use client';

import React, { useState } from 'react';
import { Search, User, GraduationCap, Mail, Clock, MapPin, CreditCard } from 'lucide-react';
import { useDatabase } from '@/hooks/useDatabase';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTitle
} from '@/components/ui/sidebar';
import { AlunoComTurma } from '@/types/database';

export function AlunosSidebar() {
  const { getAlunosComTurmas, buscarAlunos, database, loading } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTurma, setSelectedTurma] = useState<string>('');

  const alunosComTurmas = getAlunosComTurmas();

  const alunosFiltrados = React.useMemo(() => {
    let filtrados = alunosComTurmas;

    if (searchTerm) {
      filtrados = buscarAlunos(searchTerm);
    }

    if (selectedTurma) {
      filtrados = filtrados.filter(aluno => aluno.turma?.id === selectedTurma);
    }

    return filtrados;
  }, [alunosComTurmas, searchTerm, selectedTurma, buscarAlunos]);

  const turmas = React.useMemo(() => {
    if (!database) return [];
    return database.turmas.filter(t => t.status === 'ativa').sort((a, b) => a.nome.localeCompare(b.nome));
  }, [database]);

  if (loading) {
    return (
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>Carregando...</SidebarTitle>
        </SidebarHeader>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Alunos por Turma
        </SidebarTitle>
        <div className="mt-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar aluno, turma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          <select
            value={selectedTurma}
            onChange={(e) => setSelectedTurma(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Todas as turmas</option>
            {turmas.map(turma => (
              <option key={turma.id} value={turma.id}>
                {turma.nome.length > 25 ? `${turma.nome.substring(0, 25)}...` : turma.nome}
              </option>
            ))}
          </select>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="space-y-3">
          {alunosFiltrados.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <User className="h-8 w-8 lg:h-12 lg:w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm lg:text-base">Nenhum aluno encontrado</p>
            </div>
          ) : (
            alunosFiltrados.map((aluno) => (
              <AlunoCard key={aluno.id} aluno={aluno} />
            ))
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function AlunoCard({ aluno }: { aluno: AlunoComTurma }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      case 'trancado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPagamentoColor = (status: string) => {
    switch (status) {
      case 'pago': return 'text-green-600';
      case 'pendente': return 'text-yellow-600';
      case 'atrasado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate leading-tight">
              {aluno.nome}
            </h3>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${getStatusColor(aluno.status)}`}>
              {aluno.status}
            </span>
          </div>

          {aluno.turma && (
            <div className="mt-2 p-2 bg-blue-50 rounded border">
              <p className="text-xs font-medium text-blue-900 truncate">
                {aluno.turma.nome}
              </p>
              <p className="text-xs text-blue-700 truncate">
                {aluno.curso?.nome}
              </p>
              <div className="flex items-center mt-1 text-xs text-blue-600">
                <Clock className="h-3 w-3 mr-1 shrink-0" />
                <span className="truncate">{aluno.turma.diaSemana} - {aluno.turma.horario}</span>
              </div>
              <div className="flex items-center mt-1 text-xs text-blue-600 flex-wrap gap-1">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 shrink-0" />
                  <span className="truncate">{aluno.sala?.nome}</span>
                </div>
                {aluno.matricula?.cadeira && (
                  <span className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">
                    {aluno.matricula.cadeira}
                  </span>
                )}
              </div>
              {aluno.matricula?.pagamento && (
                <div className="flex items-center mt-1 text-xs">
                  <CreditCard className="h-3 w-3 mr-1 shrink-0" />
                  <span className={`truncate ${getPagamentoColor(aluno.matricula.pagamento.status)}`}>
                    R$ {aluno.matricula.pagamento.valor.toFixed(2)} - {aluno.matricula.pagamento.status}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center mt-2">
            <Mail className="h-3 w-3 text-gray-400 mr-1 shrink-0" />
            <p className="text-xs text-gray-500 truncate">
              {aluno.email}
            </p>
          </div>

          {!aluno.turma && (
            <p className="text-xs text-red-500 mt-1">
              Sem turma atribuída
            </p>
          )}
        </div>
      </div>
    </div>
  );
}