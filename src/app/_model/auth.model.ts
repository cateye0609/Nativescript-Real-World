export interface LoginModel {
    email: string;
    password: string;
}
export interface RegisterModel extends LoginModel {
    username: string;
}