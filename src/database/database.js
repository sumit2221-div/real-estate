import mongoose from "mongoose"
export const ConnectDB = async ()=> {

    try {
        if(!process.env.MONGO_URL){
            console.log("MONGODB_URI environment variable is not defined")
            process.exit(1)
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error)
        process.exit(1)
        
    }
    
}