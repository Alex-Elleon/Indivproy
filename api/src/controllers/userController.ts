import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";

export const registerUsers = async (req:Request, res:Response):Promise<void> =>{
    try {
        //Primero debemos validar que los datos existen
        const name = req.body.name
        const email = req.body.email
        const lastNames= req.body.lastNames
        const password = req.body.password
        const rol = req.body.rol

        //Administradores no pueden crear clientes
        if(req.user?.rol === "administrator" && rol === "client" ){
             res.status(400).json({
             msg:"Los administradores no pueden crear clientes"   
            })
            return
        }
        

        if(!name || !email || !lastNames || !password || !rol){
             res.status(400).json({
                msg:"Faltan datos para crear un usuario"
        })
            return
        
    }

        //Tenemos que validar que el usuario sea administrador, si el usuario usuario a crear es aadministrador 
    
    if(rol === "administrator" && req.user?.rol !="administrator" ){
         res.status(400).json({
            msg:"No puedes crear un nuevo administrador si no eres uno"
    })
            return
    }
    

    const user = await UserModel .create({
            name,
            email,
            lastNames,
            password,
            rol
    }) 
    const token = jwt.sign(JSON.stringify(user), "shhhh");


         res.status(200).json({
        msg : "¡Usuario registrado con exito!", token
    })
    return
    } catch (error) {
       console.log(error);
         res.status(500).json({
        msg : "Hubo un error al crear el usuario"
       }) 
       return
    }
}






export const singin= async (req:Request, res: Response):Promise<void>=>{
    //correo y contrseña
    //Verificr que el usuario existe
    //si no existe devuelve un error
    //Soi existe devuelve un o
    try {
        const user = await UserModel.findOne({email:req.body.email, password:req.body.password})
        
       if(!user){

        res.status(400).json({
            msg: "No hay coincidencias en el sistema"})
            return;
        }
        const token2 = jwt.sign(JSON.stringify(user),"pocoyo");

        res.status(200).json({
            msg:"Sesion iniciada con exito" , token2
        
        })
        return;
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hubo un error al iniciar sesion"
        })
        return;
    }

}