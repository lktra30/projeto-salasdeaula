export interface Cadeira {
  id: string;
  fila: string;
  numero: number;
  tipo: 'matriculado' | 'aula_experimental';
  status: 'disponivel' | 'ocupada' | 'bloqueada';
  preco?: number;
}

export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
  filas: number;
  cadeirasPerFila: number;
  cadeiras: Cadeira[];
  limites: {
    aulas_experimentais: number;
  };
}

export interface ConfiguracaoSala {
  salaId: string;
  limitesAtuais: {
    aulas_experimentais: number;
  };
}

export interface Curso {
  id: string;
  nome: string;
  descricao?: string;
}

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  curso: string;
  confirmado: boolean;
  cadeira?: string;
}

export interface AgendamentoSala {
  salaId: string;
  diaSemana: 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';
  horario: string;
  curso: string;
}