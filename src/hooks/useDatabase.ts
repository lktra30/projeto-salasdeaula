import { useState, useEffect } from 'react';
import { Database, AlunoComTurma, Turma, Curso, Matricula, Professor, SalaCompleta } from '@/types/database';
import databaseJson from '@/data/database.json';

export function useDatabase() {
  const [database, setDatabase] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDatabase = () => {
      try {
        setDatabase(databaseJson as Database);
      } catch (error) {
        console.error('Erro ao carregar banco de dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDatabase();
  }, []);

  const getAlunosComTurmas = (): AlunoComTurma[] => {
    if (!database) return [];

    return database.alunos.map(aluno => {
      const matricula = database.matriculas.find(m => m.alunoId === aluno.id);
      const turma = matricula ? database.turmas.find(t => t.id === matricula.turmaId) : undefined;
      const curso = turma ? database.cursos.find(c => c.id === turma.cursoId) : undefined;
      const professor = turma ? database.professores.find(p => p.id === turma.professorId) : undefined;
      const sala = turma ? database.salas.find(s => s.id === turma.salaId) : undefined;

      return {
        ...aluno,
        turma,
        curso,
        matricula,
        professor,
        sala
      };
    });
  };

  const getAlunosPorTurma = (turmaId: string): AlunoComTurma[] => {
    if (!database) return [];

    const matriculas = database.matriculas.filter(m => m.turmaId === turmaId);
    return matriculas.map(matricula => {
      const aluno = database.alunos.find(a => a.id === matricula.alunoId);
      const turma = database.turmas.find(t => t.id === turmaId);
      const curso = turma ? database.cursos.find(c => c.id === turma.cursoId) : undefined;
      const professor = turma ? database.professores.find(p => p.id === turma.professorId) : undefined;
      const sala = turma ? database.salas.find(s => s.id === turma.salaId) : undefined;

      return {
        ...aluno!,
        turma,
        curso,
        matricula,
        professor,
        sala
      };
    });
  };

  const getTurmasPorCurso = (cursoId: string): Turma[] => {
    if (!database) return [];
    return database.turmas.filter(t => t.cursoId === cursoId);
  };

  const getTurmasPorProfessor = (professorId: string): Turma[] => {
    if (!database) return [];
    return database.turmas.filter(t => t.professorId === professorId);
  };

  const getTurmasPorSala = (salaId: string): Turma[] => {
    if (!database) return [];
    return database.turmas.filter(t => t.salaId === salaId);
  };

  const buscarAlunos = (termo: string): AlunoComTurma[] => {
    const alunosComTurmas = getAlunosComTurmas();
    return alunosComTurmas.filter(aluno =>
      aluno.nome.toLowerCase().includes(termo.toLowerCase()) ||
      aluno.email.toLowerCase().includes(termo.toLowerCase()) ||
      aluno.cpf.includes(termo) ||
      (aluno.curso?.nome.toLowerCase().includes(termo.toLowerCase())) ||
      (aluno.turma?.nome.toLowerCase().includes(termo.toLowerCase()))
    );
  };

  const getEstatisticas = () => {
    if (!database) return null;

    const totalAlunos = database.alunos.length;
    const totalTurmas = database.turmas.length;
    const totalCursos = database.cursos.length;
    const totalSalas = database.salas.length;

    const alunosAtivos = database.alunos.filter(a => a.status === 'ativo').length;
    const turmasAtivas = database.turmas.filter(t => t.status === 'ativa').length;

    const pagamentosPendentes = database.matriculas.filter(m =>
      m.pagamento.status === 'pendente' || m.pagamento.status === 'atrasado'
    ).length;

    return {
      totalAlunos,
      totalTurmas,
      totalCursos,
      totalSalas,
      alunosAtivos,
      turmasAtivas,
      pagamentosPendentes
    };
  };

  return {
    database,
    loading,
    getAlunosComTurmas,
    getAlunosPorTurma,
    getTurmasPorCurso,
    getTurmasPorProfessor,
    getTurmasPorSala,
    buscarAlunos,
    getEstatisticas
  };
}