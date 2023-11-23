export default interface User {
    id: number,
    login: string,
    password: string,
    email: string,
    wins: number,
    looses: number,
    points: number
}

export interface RegisterationRequest {
    login: string,
    password: string,
    confirmPassword: string,
    email: string
}

export interface UserCredentials {
    login: string,
    password: string
}