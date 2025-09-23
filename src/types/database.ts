export interface Curso {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  modalidade: string;
}

export interface Turma {
  id: string;
  nome: string;
  cursoId: string;
  salaId: string;
  professorId: string;
  periodo: string;
  horario: string;
  diaSemana: string;
  dataInicio: string;
  dataFim: string;
  vagas: number;
  vagasOcupadas: number;
  status: 'ativa' | 'finalizada' | 'cancelada';
}

export interface Professor {
  id: string;
  nome: string;
  email: string;
  especialidade: string;
  experiencia: string;
}

export interface Endereco {
  rua: string;
  cidade: string;
  cep: string;
}

export interface AlunoCompleto {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  endereco: Endereco;
  status: 'ativo' | 'inativo' | 'trancado';
  dataMatricula: string;
}

export interface Pagamento {
  valor: number;
  formaPagamento: 'cartao' | 'boleto' | 'pix' | 'transferencia';
  status: 'pago' | 'pendente' | 'atrasado';
}

export interface Matricula {
  id: string;
  alunoId: string;
  turmaId: string;
  dataMatricula: string;
  status: 'ativa' | 'trancada' | 'finalizada';
  cadeira?: string;
  pagamento: Pagamento;
}

export interface SalaCompleta {
  id: string;
  nome: string;
  capacidade: number;
  andar: number;
  equipamentos: string[];
  status: 'ativa' | 'manutencao' | 'inativa';
}

export interface Database {
  cursos: Curso[];
  turmas: Turma[];
  professores: Professor[];
  alunos: AlunoCompleto[];
  matriculas: Matricula[];
  salas: SalaCompleta[];
}

export interface AlunoComTurma extends AlunoCompleto {
  turma?: Turma;
  curso?: Curso;
  matricula?: Matricula;
  professor?: Professor;
  sala?: SalaCompleta;
}