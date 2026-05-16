import { UserResponse, UserPreview } from "./user"

export interface ApiResponse {
    success?: boolean,
    message?: string,
    data?: DataResponse | DataResponse[]
}

export interface DataResponse {
    id?: number,
    user?: UserResponse | UserPreview | Pick<UserResponse, "id" | "email" | "permissionLevel">
}