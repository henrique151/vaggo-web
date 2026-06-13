const validationMessages = {
  string: {
    min: (field: string, value: number) =>
      `O ${field} precisa possuir no mínimo ${value} caracteres.`,

    max: (field: string, value: number) =>
      `O ${field} pode possuir no máximo ${value} caracteres.`,

    fixed: (field: string, value: number) =>
      `O ${field} deve possuir ${value} caracteres.`,

    limit: (field: string, min: number, max: number) =>
      `O ${field} precisa possuir entre ${min} e ${max} caracteres.`,
  },

  number: {
    min: (field: string, value: number) =>
      `O ${field} deve ser maior ou igual a ${value}.`,

    max: (field: string, value: number) =>
      `O ${field} deve ser menor ou igual a ${value}.`,

    integer: (field: string) => `O ${field} deve ser um número inteiro.`,
  },

  format: {
    invalid: (field: string) => `Insira um ${field} válido.`,
  },

  enum: {
    invalid: (field: string) => `Selecione uma opção válida para ${field}.`,
  },

  array: {
    min: (field: string, value: number) =>
      `O ${field} deve possuir no mínimo ${value} itens.`,

    max: (field: string, value: number) =>
      `O ${field} pode possuir no máximo ${value} itens.`,

    fixed: (field: string, value: number) =>
      `O ${field} deve possuir exatamente ${value} itens.`,
  },

  file: {
    maxSize: (field: string, value: string) =>
      `O ${field} pode possuir no máximo ${value}.`,

    invalidType: (field: string) =>
      `O tipo de arquivo enviado para ${field} não é válido.`,
  },

  common: {
    required: (field: string) => `O campo ${field} é obrigatório.`,

    invalid: (field: string) => `O valor informado para ${field} não é válido.`,
  },
};

export default validationMessages;
