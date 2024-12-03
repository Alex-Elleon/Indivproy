import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";


export const createQuestions = async (req: Request, res: Response): Promise<void> => {

    const title = req.body.title
    const type = req.body.type
    const isMandatory = req.body.isMandatory
    const questionnaireId = req.body.questionnaireId
    const rol = req.body.rol



    try {
        if (rol === "administrador") {
            res.status(400).json({
                msg: "Los administradores no pueden crear preguntas"
            })
            return
        }

        if (!type || !title || !questionnaireId || !isMandatory || !rol) {
            res.status(400).json({
                msg: "Faltan datos para crear una nueva pregunta"
            })
            return
        }

        const createQuestions = await UserModel.create({
            title,
            type,
            rol,
            isMandatory,
            questionnaireId
        })
        res.status(200).json({
            msg: "¡Pregunta creada con exito!", createQuestions
        })
        return

    } catch (error) {
        res.status(200).json({
            msg: "¡Hubo un error :( !"
        })
        return
    }
}


export const getQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        const questions = await UserModel.findOne({ title:req.body.title, type:req.body.type,
             isMandatory:req.body.isMandatory, questionnaireId:req.body.questionnaireId, rol:req.body.rol })

        if (!questions) {

            res.status(400).json({
                msg: "No hay coincidencias en el sistema"
            })
            return;
        }
        res.status(200).json({
            msg: "Se obtuvo la pregunta con exito", questions
        })
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al obtener la pregunta"
        })
        return;
    }

}



export const createOption = async (req: Request, res: Response): Promise<void> => {

    const questionId = req.body.questionId
    const title = req.body.title
    const rol = req.body.rol

    try {
        if (rol === "administrador") {
            res.status(400).json({
                msg: "Los administradores no pueden crear opciones"
            })
            return
        }

        if ( !title || !questionId ||  !rol) {
            res.status(400).json({
                msg: "Faltan datos para crear una nueva opcion"
            })
            return
        }

        const createOption = await UserModel.create({
            title,
            rol,
            questionId
        })
        res.status(200).json({
            msg: "¡Opcion creada con exito!", createOption
        })
        return

    } catch (error) {
        res.status(200).json({
            msg: "¡Hubo un error :( !"
        })
        return
    }
}


export const getOptions = async (req: Request, res: Response): Promise<void> => {
    try {
        const options = await UserModel.findOne({questionId : req.body.questionId, title : req.body.title, rol : req.body.rol})

        if (!options) {

            res.status(400).json({
                msg: "No hay coincidencias en el sistema"
            })
            return;
        }
        res.status(200).json({
            msg: "Se obtuvo la opcion con exito", options
        })
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al obtener la opcion"
        })
        return;
    }

}

 




export const createAnswer = async (req: Request, res: Response): Promise<void> => {

    const questionnaireId = req.body.questionnaireId
    const questionId = req.body.questionId
    const answer = req.body.answer
    const rol = req.body.rol

    try {
        if (rol === "administrator") {
            res.status(400).json({
                msg: "Los administradores no pueden crear respuestas"
            })
            return
        }


        if (!questionnaireId || !questionId || !answer || !rol) {
            res.status(400).json({
                msg: "Faltan datos para crear una nueva respuesta"
            })
            return
        }

        const getAnswers = await UserModel.create({
            questionnaireId,
            questionId,
            rol,
            answer
        })
        res.status(200).json({
            msg: "¡Respuesta creada con exito!", getAnswers
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al crear la nueva respuesta"
        })
        return
    }

}


export const getAnswers = async (req: Request, res: Response): Promise<void> => {
    try {
        const answers = await UserModel.findOne({questionId : req.body.questionId, questionnaireId : req.body.questionnaireId,
             rol : req.body.rol, answer : req.body.answer})

        if (!answers) {

            res.status(400).json({
                msg: "No hay coincidencias en el sistema"
            })
            return;
        }
        res.status(200).json({
            msg: "Se obtuvo la respuesta con exito", answers
        })
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al obtener la respuesta"
        })
        return;
    }

}








export const createQuestionnaires = async (req: Request, res: Response): Promise<void> => {

    const title = req.body.title
    const description = req.body.description
    const userId = req.body.userId
    const rol = req.body.rol
    try {
        if (rol === "administrator") {
            res.status(400).json({
                msg: "Los administradores no pueden crear cuestionarios"
            })
            return
        }


        if (!userId || !title || !description || !rol) {
            res.status(400).json({
                msg: "Faltan datos para crear un nuevo cuestionario"
            })
            return
        }

        const createQuestionnaires = await UserModel.create({
            title,
            description,
            rol,
            userId
        })
        res.status(200).json({
            msg: "¡Cuestionario creado con exito!", createQuestionnaires
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al crear el nuevo cuestionario"
        })
        return
    }
}


export const getQuestionnaires = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionnaire = await UserModel.findOne({ title: req.body.title, description: req.body.description, userId: req.body.userId, rol: req.body.rol })

        if (!questionnaire) {

            res.status(400).json({
                msg: "No hay coincidencias en el sistema"
            })
            return;
        }
        res.status(200).json({
            msg: "Se obtuvo el cuestionario con exito", questionnaire
        })
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al obtener el cuestionario"
        })
        return;
    }

}