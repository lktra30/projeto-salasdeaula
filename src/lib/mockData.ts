import { Sala, Cadeira, Curso, Aluno, AgendamentoSala } from '@/types/auditorio';

function criarCadeirasEmFileiras(): Cadeira[] {
  const cadeiras: Cadeira[] = [];

  const filas = ['A', 'B', 'C'];
  const cadeirasPorFila = 6;

  let numeroSequencial = 1;

  filas.forEach((fila) => {
    for (let coluna = 1; coluna <= cadeirasPorFila; coluna += 1) {
      cadeiras.push({
        id: `${fila}${coluna}`,
        fila,
        numero: numeroSequencial,
        tipo: 'matriculado',
        status: 'disponivel',
        preco: 50
      });

      numeroSequencial += 1;
    }
  });

  return cadeiras;
}


export const salasIniciais: Sala[] = [
  {
    id: 'sala-1',
    nome: 'Sala InCompany',
    capacidade: 18,
    filas: 3,
    cadeirasPerFila: 6,
    cadeiras: criarCadeirasEmFileiras(),
    limites: {
      aulas_experimentais: 4
    }
  },
  {
    id: 'sala-2',
    nome: 'Sala Mastar T1',
    capacidade: 18,
    filas: 3,
    cadeirasPerFila: 6,
    cadeiras: criarCadeirasEmFileiras(),
    limites: {
      aulas_experimentais: 4
    }
  },
  {
    id: 'sala-3',
    nome: 'Sala Mastar T2',
    capacidade: 18,
    filas: 3,
    cadeirasPerFila: 6,
    cadeiras: criarCadeirasEmFileiras(),
    limites: {
      aulas_experimentais: 4
    }
  },
  {
    id: 'sala-4',
    nome: 'Sala Mastar T3',
    capacidade: 18,
    filas: 3,
    cadeirasPerFila: 6,
    cadeiras: criarCadeirasEmFileiras(),
    limites: {
      aulas_experimentais: 4
    }
  },
  {
    id: 'sala-5',
    nome: 'Sala VoxTime',
    capacidade: 18,
    filas: 3,
    cadeirasPerFila: 6,
    cadeiras: criarCadeirasEmFileiras(),
    limites: {
      aulas_experimentais: 4
    }
  },
  {
    id: 'sala-6',
    nome: 'Sala IntensiVox',
    capacidade: 18,
    filas: 3,
    cadeirasPerFila: 6,
    cadeiras: criarCadeirasEmFileiras(),
    limites: {
      aulas_experimentais: 4
    }
  }
];

export const cursos: Curso[] = [
  { id: 'incompany', nome: 'InCompany', descricao: 'Cursos personalizados para empresas' },
  { id: 'mastar-t1', nome: 'Mastar T1', descricao: 'Curso Mastar nível T1' },
  { id: 'mastar-t2', nome: 'Mastar T2', descricao: 'Curso Mastar nível T2' },
  { id: 'mastar-t3', nome: 'Mastar T3', descricao: 'Curso Mastar nível T3' },
  { id: 'voxtime', nome: 'VoxTime', descricao: 'Curso de comunicação e apresentação' },
  { id: 'intensivox', nome: 'IntensiVox', descricao: 'Curso intensivo de oratória' }
];

export const alunosFicticios: Aluno[] = [
  { id: 'aluno-1', nome: 'Ana Silva', email: 'ana@email.com', curso: 'incompany', confirmado: true, cadeira: 'A1' },
  { id: 'aluno-2', nome: 'Bruno Santos', email: 'bruno@email.com', curso: 'mastar-t1', confirmado: false },
  { id: 'aluno-3', nome: 'Carlos Pereira', email: 'carlos@email.com', curso: 'voxtime', confirmado: true, cadeira: 'B1' },
  { id: 'aluno-4', nome: 'Diana Costa', email: 'diana@email.com', curso: 'intensivox', confirmado: true, cadeira: 'C1' },
  { id: 'aluno-5', nome: 'Eduardo Lima', email: 'eduardo@email.com', curso: 'mastar-t2', confirmado: false },
  { id: 'aluno-6', nome: 'Fernanda Rocha', email: 'fernanda@email.com', curso: 'mastar-t3', confirmado: true, cadeira: 'A2' },
  { id: 'aluno-7', nome: 'Gabriel Oliveira', email: 'gabriel@email.com', curso: 'voxtime', confirmado: false },
  { id: 'aluno-8', nome: 'Helena Martins', email: 'helena@email.com', curso: 'incompany', confirmado: true, cadeira: 'B2' }
];

export const agendamentos: AgendamentoSala[] = [
  { salaId: 'sala-1', diaSemana: 'segunda', horario: '09:00', curso: 'incompany' },
  { salaId: 'sala-2', diaSemana: 'terca', horario: '14:00', curso: 'mastar-t1' },
  { salaId: 'sala-3', diaSemana: 'quarta', horario: '16:00', curso: 'mastar-t2' },
  { salaId: 'sala-4', diaSemana: 'quinta', horario: '10:00', curso: 'mastar-t3' },
  { salaId: 'sala-5', diaSemana: 'sexta', horario: '15:00', curso: 'voxtime' },
  { salaId: 'sala-6', diaSemana: 'sabado', horario: '09:30', curso: 'intensivox' }
];