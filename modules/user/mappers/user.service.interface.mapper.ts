import { UserClassInterface } from "@interfaces";

export default function map(data: any): UserClassInterface {
  return {
    id: data.id,
    email: data.email,
    avatar: { url: data.avatarUrl },
    lastTime: {
      login: data.lastLogin,
      online: data.lastOnline,
    },
    permissionLevel: data.permissionLevel,
    status: {
      blocked: data.isBlocked,
      admin: data.isAdmin,
    },
    person: {
      id: data.person.id,
      name: data.person.name,
      cpf: data.person.cpf,
      gender: data.person.gender,
      phone: data.person.phone,
      date: {
        birth: data.person.birthDate,
        registration: data.person.registrationDate,
      },
      status: {
        active: data.person.isActive,
      },
    },
  };
}
