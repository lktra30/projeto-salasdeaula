import { useState, useEffect } from 'react';
import { Aluno } from '@/types/aluno';
import alunosData from '@/data/alunos.json';

export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlunos = () => {
      try {
        setAlunos(alunosData.alunos);
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAlunos();
  }, []);

  const getAlunosPorCurso = (curso: string) => {
    return alunos.filter(aluno => aluno.curso === curso);
  };

  const getAlunosPorStatus = (status: string) => {
    return alunos.filter(aluno => aluno.status === status);
  };

  const buscarAluno = (termo: string) => {
    return alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(termo.toLowerCase()) ||
      aluno.matricula.includes(termo) ||
      aluno.email.toLowerCase().includes(termo.toLowerCase())
    );
  };

  return {
    alunos,
    loading,
    getAlunosPorCurso,
    getAlunosPorStatus,
    buscarAluno
  };
}