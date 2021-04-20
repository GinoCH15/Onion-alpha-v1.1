import { startServer } from './loaders/express';
import { connect } from './loaders/mongo';


/*  --------------------------------------------------
 *
 *  This section starts the proyect
 *
 *  We implements hexagonal arquitecture
 *  Remember, this arquitecture have 3 layers
 *  
 *  - Infrastructure layer
 *  - Aplication layer
 *  - Domain layer
 *
 *  --------------------------------------------------
 *  Implements layer infrastucture
 *  --------------------------------------------------
 *
 *  This file only import Loaders
 *
 *  1. Database connection
 *  2. Server connection
 *
 */


async function startProyect(): Promise<any> {
  try{
    console.clear()
    await connect();
    await startServer();

  }catch(error){
    console.log(error);
  }
}

startProyect();
