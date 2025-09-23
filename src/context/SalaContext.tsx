'use client';

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { Sala, Curso, Aluno, AgendamentoSala } from '@/types/auditorio';
import { salasIniciais, cursos, alunosFicticios, agendamentos } from '@/lib/mockData';
import { saveToCache, loadFromCache, clearCache } from '@/lib/cache';

interface SalaContextType {
  salas: Sala[];
  cursos: Curso[];
  alunos: Aluno[];
  agendamentos: AgendamentoSala[];
  updateSala: (salaId: string, sala: Sala) => void;
  getSalaById: (id: string) => Sala | undefined;
  getCursoBySalaId: (salaId: string) => Curso | undefined;
  getAlunosByCurso: (cursoId: string) => Aluno[];
  resetToDefault: () => void;
}

const SalaContext = createContext<SalaContextType | undefined>(undefined);

export function SalaProvider({ children }: { children: ReactNode }) {
  const [salas, setSalas] = useState<Sala[]>(salasIniciais);
  const [cursosData] = useState<Curso[]>(cursos);
  const [alunosData] = useState<Aluno[]>(alunosFicticios);
  const [agendamentosData] = useState<AgendamentoSala[]>(agendamentos);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hidratação apenas no cliente
  useEffect(() => {
    setIsHydrated(true);
    const cachedSalas = loadFromCache();
    if (cachedSalas) {
      setSalas(cachedSalas);
    }
  }, []);

  // Salvar no cache sempre que salas mudarem (apenas após hidratação)
  useEffect(() => {
    if (isHydrated) {
      saveToCache(salas);
    }
  }, [salas, isHydrated]);

  const updateSala = (salaId: string, salaAtualizada: Sala) => {
    setSalas(prev => {
      const novasSalas = prev.map(sala => 
        sala.id === salaId ? salaAtualizada : sala
      );
      return novasSalas;
    });
  };

  const getSalaById = (id: string) => {
    return salas.find(sala => sala.id === id);
  };

  const getCursoBySalaId = (salaId: string) => {
    const agendamento = agendamentosData.find(a => a.salaId === salaId);
    if (agendamento) {
      return cursosData.find(c => c.id === agendamento.curso);
    }
    return undefined;
  };

  const getAlunosByCurso = (cursoId: string) => {
    return alunosData.filter(aluno => aluno.curso === cursoId);
  };

  const resetToDefault = () => {
    clearCache();
    setSalas(salasIniciais);
  };

  return (
    <SalaContext.Provider value={{
      salas,
      cursos: cursosData,
      alunos: alunosData,
      agendamentos: agendamentosData,
      updateSala,
      getSalaById,
      getCursoBySalaId,
      getAlunosByCurso,
      resetToDefault
    }}>
      {children}
    </SalaContext.Provider>
  );
}

export function useSalaContext() {
  const context = useContext(SalaContext);
  if (context === undefined) {
    throw new Error('useSalaContext must be used within a SalaProvider');
  }
  return context;
}