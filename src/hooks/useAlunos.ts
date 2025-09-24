import { useState, useEffect } from "react";
import { Aluno } from "@/types/aluno";
import alunosData from "@/data/alunos.json";

const isAlunoStatus = (status: unknown): status is Aluno["status"] => (
  status === "ativo" || status === "inativo" || status === "trancado"
);

const isAluno = (aluno: unknown): aluno is Aluno => {
  if (!aluno || typeof aluno !== "object") {
    return false;
  }

  const candidate = aluno as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.nome === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.curso === "string" &&
    typeof candidate.semestre === "number" &&
    typeof candidate.matricula === "string" &&
    isAlunoStatus(candidate.status) &&
    (candidate.foto === undefined || typeof candidate.foto === "string")
  );
};

export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlunos = () => {
      try {
        const rawAlunos: unknown[] = Array.isArray(alunosData?.alunos) ? alunosData.alunos : [];
        const alunosValidados = rawAlunos.filter((item): item is Aluno => isAluno(item));
        setAlunos(alunosValidados);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlunos();
  }, []);

  const getAlunosPorCurso = (curso: string) => {
    return alunos.filter(aluno => aluno.curso === curso);
  };

  const getAlunosPorStatus = (status: Aluno["status"]) => {
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
