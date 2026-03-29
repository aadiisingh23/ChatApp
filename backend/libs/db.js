import mongoose from "mongoose";


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase is Connected Succesfully");
    } catch (error) {
        console.log("Error in connection to dataBase Connection",error.message)
    }
}

export default connectDb