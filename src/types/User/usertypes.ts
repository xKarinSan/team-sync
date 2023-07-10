export type User = {
    userId: string;
    email: string;
    username: string;
    profilePic: string;
};

export type EmailLoginUser = {
    email:string
    password:string     
}

export type EmailRegisterUser = {
    username:string
    email:string
    password:string  
    confirmPassword?:string
}