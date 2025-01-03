
interface IUser {
    _id:string;
    name:string,
    email:string,
    lastNames:string,
    password:string,
    rol:"administrator" | "client"
    }

declare namespace Express{
     interface Request{
        user?:IUser
    }
}