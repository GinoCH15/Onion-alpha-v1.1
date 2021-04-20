import mongoose,{ model, Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  type: Number;
  emailToken: string;
  expireToken: string;
  comparePassword: (password: string) => Promise<Boolean>;
  createToken: () => Promise<string>;
  getDateOfExpireToken: (length: number) => Promise<string>;
};

const userSchema = new Schema <IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type :{ 
    type: Number, 
    enum: [0,1], 
    default: 0    
  },
  emailToken :{
    type: String
  },
  expireToken :{
    type: String
  }
}, { timestamps: true });

userSchema.pre<IUser>("save", async function(next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  const hash = Buffer.from(encodeURIComponent(escape(user.password))).toString("base64")
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
  if (password.length < 8) return false
  const hash = Buffer.from(encodeURIComponent(escape(password))).toString("base64")
  if(hash != this.password) return false
  return true
};

userSchema.methods.getDateOfExpireToken = async function(): Promise<string> {
  try {
    const today =  new Date();
    today.setDate(today.getDate() + 1);
    return today.toString();
  } catch (err) {
    throw "Error al generar el tiempo de expiración del token, intentelo más tarde";
  }
};

userSchema.methods.createToken = async function(length: number): Promise<string> {
  try{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  }catch(error){
    throw "Error al generar el token de validación, vuelva a intentarlo más tarde.";
  }
};
export default model<IUser>("User", userSchema);
