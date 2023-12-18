import mongoose from "mongoose";

const connectedToDb = async(req,res) => {
    mongoose.connect('mongodb+srv://gopaldb:Dar123@cluster0.iae5kck.mongodb.net/User1')
    .then((conn) => {
        console.log(`Connected to DB : ${conn.connection.host}`);

    })
    .catch((error) => {
        console.log(error.message);
    })
}

export default connectedToDb