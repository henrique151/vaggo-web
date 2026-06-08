import * as z from "zod";


const Login = z.object({
    email: z.email("Insira um formato válido para e-mail."),

    password: z
        .string()
        .min(8, "A senha precisa possuir no mínimo 8 caracteres"),
});

const Edit = z.object({
    
})

const Register = z.object({
    name: z.string(),
    cpf: z.string().length(11, "O CPF precisa ser do máximo 11 caracteres!"),
    gender: z.string(),
    phone: z.string().length(11, "O número de Celular precisa ser no máximo 11 caracteres!"),
    birthDate: z.date(),
    email: z.email("Insira um formato válido para e-mail"),
    password: z.string().min(8, "A senha precisa possuir no mínimo 8 caracteres")
})


const UserSchema = {
    LOGIN_FORM: Login,
    EDIT_FORM: Edit,
    REGISTER_FORM: Register,
}

export default UserSchema