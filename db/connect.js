import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config("../");
let my_conexion = JSON.parse(process.env.MY_CONNECT)

export async function con(){
    try {
        const uri = `mongodb+srv://${my_conexion.user}:${my_conexion.password}@cluster0.oj8cvn0.mongodb.net/${my_conexion.nameDB}`
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await MongoClient.connect(uri, options);
        return client.db();

    } catch (error) {
        return {status: 500, message: error}
    }
}