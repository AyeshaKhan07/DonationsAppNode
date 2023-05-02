import { connectionSource } from "./data-source"

export const establishConnection = () => {
    connectionSource.initialize()
        .then(() => {
            console.log('Database connected!')
        })
        .catch((error) => console.log(error))
}