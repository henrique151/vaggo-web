import * as z from "zod";
import msg from "@/controllers/schemas/validations_messages";

/*
{
name	string
minLength: 3
maxLength: 100

gender	string
Enum:
[ M, F, O ]

phone	string
minLength: 10
maxLength: 15

birthDate	string($date)

email	string($email)

password	string
minLength: 8
maxLength: 128

permissionLevel	string
Enum:
[ 1, 2, 3 ]

avatarUrl	string($binary)
}
*/

const FIELD = {
  // NOMES DE EXIBIÇÃO
  NAME: "nome",
  EMAIL: "e-mail",
  PASSWORD: "senha",
  CPF: "CPF",
  PHONE: "telefone",
  GENDER: "gênero",
  PERMISSION: "nível de permissão",
  BIRTH_DATE: "data de nascimento",
} as const;

const Login = z.object({
  email: z.email(msg.format.invalid(FIELD.EMAIL)),

  password: z
    .string()
    .min(8, msg.string.min(FIELD.PASSWORD, 8))
    .max(128, msg.string.max(FIELD.PASSWORD, 128)),
});

const Edit = z.object({
  name: z
    .string()
    .min(3, msg.string.min(FIELD.NAME, 3))
    .max(100, msg.string.max(FIELD.NAME, 100)),

  gender: z.enum(["M", "F", "O"], {
    message: msg.enum.invalid(FIELD.GENDER),
  }),

  phone: z
    .string()
    .min(10, msg.string.min(FIELD.PHONE, 10))
    .max(15, msg.string.max(FIELD.PHONE, 15)),

  birthDate: z.string(),

  email: z.email(msg.format.invalid(FIELD.EMAIL)),

  password: z
    .string()
    .min(8, msg.string.min(FIELD.PASSWORD, 8))
    .max(128, msg.string.max(FIELD.PASSWORD, 128)),

  permissionLevel: z.enum(["1", "2", "3"], {
    message: msg.enum.invalid(FIELD.PERMISSION),
  }),

  // avatarUrl: z.instanceof(File),
});

const Register = z.object({
  name: z
    .string()
    .min(3, msg.string.min(FIELD.NAME, 3))
    .max(100, msg.string.max(FIELD.NAME, 100)),

  cpf: z.string().length(11, msg.string.fixed(FIELD.CPF, 11)),

  gender: z.enum(["M", "F", "O"], {
    message: msg.enum.invalid(FIELD.GENDER),
  }),

  phone: z
    .string()
    .min(10, msg.string.min(FIELD.PHONE, 10))
    .max(15, msg.string.max(FIELD.PHONE, 15)),

  // birthDate: z.date(),

  email: z.email(msg.format.invalid(FIELD.EMAIL)),

  password: z
    .string()
    .min(8, msg.string.min(FIELD.PASSWORD, 8))
    .max(128, msg.string.max(FIELD.PASSWORD, 128)),
});

const UserSchema = {
  LOGIN_FORM: Login,
  EDIT_FORM: Edit,
  REGISTER_FORM: Register,
};

export default UserSchema;
