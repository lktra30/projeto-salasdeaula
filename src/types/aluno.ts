export interface Aluno {
  id: number;
  nome: string;
  email: string;
  curso: string;
  semestre: number;
  matricula: string;
  status: 'ativo' | 'inativo' | 'trancado';
  foto?: string;
}

export interface AlunosData {
  alunos: Aluno[];
}