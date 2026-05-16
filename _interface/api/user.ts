import { DataResponse } from "./api"

export interface UserResponse extends DataResponse {
    id: number;
    email: string;
    password: string; // hashed password
    lastLogin: string; // ISO datetime string
    isBlocked: boolean;
    isAdmin: boolean;
    permissionLevel: number;
    personId: number;
    person: PersonResponse;
}

export type UserPreview = Pick<UserResponse, "id" | "email" >

interface PersonResponse {
    id: number,
    name: string,
    cpf: string,
    gender: string | "M" | "F",
    phone: string,
    birthDate: string, //yyyy-mm-dd
    registrationDate: string, //yyyy-mm-dd
    isActive: boolean
}

// OLD
// export interface UserResponse extends DataResponse {
//     id: number,
//     email: string,
//     lastLogin: string, //JS Date Object string format
//     isBlocked: boolean,
//     isAdmin: boolean,
//     permissionLevel: number,
//     personId?: number,
//     PES_INT_ID?: number,
//     person: PersonResponse
// }
