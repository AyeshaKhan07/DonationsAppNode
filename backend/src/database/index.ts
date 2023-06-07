import { connectionSource } from "./data-source"

export const establishConnection = async () => {
    try {
        await connectionSource.initialize()
        console.log('Database connected!')
    } catch (error) {
        console.log(error)
    }
}

export const endConnection  = async () => {
    try {
        await connectionSource.destroy()
        console.log('Database connection closed!')
    } catch (error) {
        console.log(error)
    }
}