import mongoose from "mongoose";
import { mongodb } from '../config/key';


/*  --------------------------------------------------
 *
 *  Connection with Mongo database
 *
 *  --------------------------------------------------
 *  This file is implements in layer infrastucture
 *  --------------------------------------------------
 *
 */


import { default as connectMongoDBSession} from 'connect-mongo';
let database: mongoose.Connection;
let instanceConnection: number = 0;

export const connect = () : Promise<void> => ( new Promise((res, rej) => {
  if (database) {
    return res();
  }  

  mongoose.connect( mongodb.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  });  
  
  database = mongoose.connection;  
  
  database.once("open", async () => {
    console.log(`
      ########################################
      ║  🛡️      Data base connected       🛡️  ║
      ########################################
    `);
    return res()
  });  
  
  database.on("error", (error) => {
    console.log("Error to connect!!!");
    return rej(error)
  });

  database.on("disconnected", connect);

  database.on("reconnectFailed", async ()=>{ 
    instanceConnection++;
    console.log(`Try to connect ${instanceConnection}`);
  })
  
})); 

export const storeMongo = (session:any) => {
  const MongoDBStore = connectMongoDBSession(session);
  var store = new MongoDBStore({
    url: mongodb.MONGO_URI,
    autoReconnect: true
  });
  return store
};

export const disconnect = () => {  
  if (!database) {
    return;
  }  
  mongoose.disconnect();
};

export function getConection():any {
  return database;
};
