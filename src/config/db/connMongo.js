import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connDB = async () => {
    try {
        // connect to db by uri 
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to Mongo !!')

        // check health before handle request
        await mongoose.connection.db.admin().ping()
        console.log('Mongo ping successfull !!')
    } catch (error) {
        console.log('Mongo connection err: ', error.message)
        process.exit(1)
    }
}

// handle disconnect event
mongoose.connection.on('disconnected', () => {
    console.log('Mongo disconnected')
}) 

// handle exit
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log("Mongo close !!")
    process.exit(0)
})

export default connDB