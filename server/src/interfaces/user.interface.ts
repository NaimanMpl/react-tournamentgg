export default interface User {
    id: number,
    login: string,
    password: string,
    email: string
}

export interface RegisterationRequest {
    login: string,
    password: string,
    confirmPassword: string,
    email: string
}