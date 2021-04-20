import dotenv from 'dotenv';

/*
 *  Manejar el ambiente de produccion / de testing / desarrollo con express
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = dotenv.config();

if( env.error ) throw new Error( 'Dont find env file' );

const getConfigValue = (key: string) => {
  return <string> process.env[key];
}

export const mongodb = {
  "MONGO_URI": getConfigValue("MONGO_URI")
}

export const cloudinarykeys = {
  "CLOUDINARY_CLOUD_NAME": getConfigValue( "CLOUDINARY_CLOUD_NAME" ),
  "CLOUDINARY_API_KEY": getConfigValue( "CLOUDINARY_API_KEY" ),
  "CLOUDINARY_API_SECRET": getConfigValue( "CLOUDINARY_API_SECRET" )
}

export const expressKeys = {
  "port": parseInt(getConfigValue("PORT")),
  "host": parseInt( getConfigValue("HOST")),
  "SESSION_SECRET": getConfigValue("SESSION_SECRET")
}

export const tokenSession = {
  "SECRET": getConfigValue("SESSION_SECRET")
}

export const sendinBlue = {
  "user": getConfigValue("SENDINBLUE_USER"),
  "password": getConfigValue("SENDINBLUE_PASSWORD")
}