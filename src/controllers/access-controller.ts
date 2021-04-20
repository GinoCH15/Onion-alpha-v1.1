import { Request, Response, NextFunction } from 'express'
import {validateEmail} from '../lib/helpers'
import {plainMailService} from '../loaders/nodeMailer'
import User from '../models/User'

class AccessController {
  
  public getLogIn = async (req: Request, res: Response, next:NextFunction) => {
    try {
      res.render('Access/login')
    } catch (error) {
      return next(error);
    }
   }
 
  public postLogIn = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const {email, password} = req.body;
      if(!validateEmail(email)) throw ('Email no válido')

      const user = await User.findOne({email: email});
      if(!user){
        req.flash('errors', 'El usuario no existe');
        return res.redirect('back');
      } 
      
      const isMatch = await user.comparePassword(password);
      if(!isMatch) {
        req.flash('errors', 'La contraseña es incorrecta');
        return res.redirect('back');
      }

      let route: string = '';
      switch(user.type){
        case 0:
          route = '/admin/productos-ofertados';
          break;
        case 1:
          route = '/mis-productos-ofertados';
          break;
        default:
          throw 'Error al solicitar la información.';
      }
      
      return req.logIn(user,function (err:any) {
        if(err) {
        req.flash('errors', 'Ha ocurrido un error interno, intentelo mas tarde')
        return res.redirect('back')
        }
        req.flash('success', 'Bienvenido');
        return res.redirect(route);
      });
    } catch (error) {
      return next(error);
    }
  }

  public postSignUp = async (req: Request, res: Response, next:NextFunction) => { 
    try{
      const {body} = req;

      if( !this.validateEmail(body.email)) throw ( "El correo ingresado no es válido." );
      if(await this.existEmail(body.email)) throw ( "El correo ingresado ya esta registrado" );
      this.validatePassword(body.password, body.password2);
    
      let user = {
        email: body.email, 
        password: body.password, 
        name: body.name, 
        phone: body.phone, 
        age: body.age,
        type: 1
      }

      const newUser = await this.createUser(user)

      return req.logIn(newUser, function(err:any) {
        if (err) {
          throw "Ha ocurrido un error interno al registrar la cuenta, intenlo más tarde.";
        }
        req.flash("success", 'Bienvenido')
        return res.redirect('/mis-productos-ofertados');
      });
  
    }catch(error){
      req.flash('errors', error.message);
      return res.render('Access/login', {flag: 1})
      //return res.redirect('back');
    }
  }

  public logout = async (req: Request, res:Response, next:NextFunction) =>{
    try {
      req.logout();
      req.session.destroy((err: any) => {
        if (err) console.log('Error : Error al destruir la sesión, intente de nuevo en unos minutos.', err);
        res.redirect('/login');
      });
    } catch (error) {
      return next(error);
    }
  }

  public getRecuperate = async(req: Request, res: Response, next:NextFunction) => {
    try {
      res.render('Access/recuperate')
    } catch (error) {
      return next(error);
    }
  }

  public postRecuperate = async(req: Request, res: Response, next:NextFunction) => {
    try {
      const {email} = req.body;
      const {headers} = req;
      const token: string = await this.forgotUser(email);

      const subject: string ="Vulpus: Recupera tu contraseña"

      const text: string = `
        Hola,\n\n
        Hemos recibido su solicitud de cambio de contraseña. Este correo electrónico contiene la información que necesita para cambiar su contraseña.\n\n
        Haga clic en este enlace para ingresar su nueva contraseña: http://${headers.host}/reiniciar/${token}\n\n
        Atentamente,
        Vulpus`

      const message: string = await plainMailService("no-reply@starter.pe",email,subject,text);

      req.flash("success", message);
      return res.redirect('/login');
    } catch (error) {
      req.flash('errors', error.message);
      return res.redirect('back');
    }
  }

  public getReset = async(req: any, res: Response) => {
    try {
      const { token } = req.params;
      
      if(!token){
        req.flash("errors", 'Es necesario un token');
        return res.redirect('/');
      }
      return res.render('Access/reset')
    } catch (error) {
      throw error;
    }
  }

  public postReset = async(req: any, res: any, next: NextFunction) => {
    try{
      const { token } = req.params;
      const { pssw1, pssw2 } = req.body;
      console.log(token, pssw1, pssw2)
      const response: string = await this.updatePassword(token, pssw1, pssw2);
  
      req.flash('success', "Se modificó correctamente su contraseña.")
      return res.redirect('/login');
  
    }catch(error){
      req.flash('errors', error.message);
      return res.redirect('back');
    }
  }
  //Functions


  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
  }

  async existEmail(email: string): Promise<boolean>{
    if(await User.findOne({ email: email })){
      return true;
    }else{
      return false
    }
  }

  validatePassword(password: string, confirmPassword: string): any | Error {
    try{
      if( this.checkType(password) !== '2' ) throw ('La contraseña debe contener al menos una letra mayúscula y una minúscula.');
      if (password.length < 8) throw ("La contraseña debe contener al menos 8 caracteres" )
      if (password != confirmPassword) throw ( "Las contraseñas no coinciden" );
    }
    catch(error){
       throw (error)
    }
  }

  checkType(password: string): any {
    password = password.trim();
    const regxs = {
      "lower": /^[a-z0-9 ]+$/,
      "upper": /^[A-Z0-9 ]+$/,
      "upperLower": /^[A-Za-z0-9 ]+$/
    }
  
    if (regxs.lower.test(password)) { return '0'; }
    if (regxs.upper.test(password)){ return '1'; }
    if (regxs.upperLower.test(password)){ return '2'; }
  
    return -1;
  }

  async createUser(object: any): Promise<any> {
    try{
      const newUser = new User(object);
      await newUser.save();
      return newUser;
    }catch(error){
      console.log(error);
      return 500;
    }
  }

  async forgotUser (email: string): Promise<string> {
    try{
      const isE = this.validateEmail(email);
      if(!isE) throw "Correo mal ingresado";

      const exits = await this.existEmail( email );
      if( !exits ) throw "El correo ingresado no esta registrado en la plataforma.";
      
      const response = await this.saveNewTokenInUserAccount(email);
      return response;
  
    }catch(error){
      console.log(error);
      throw Error(error);
    }
  }

  private async updateToken(email: string, token: string, date: string): Promise<string>{
    try{

      const user = await User.findOneAndUpdate(
        { 
          "email": email 
        },
        { 
          $set: {
            "emailToken": token,
            "expireToken": date
          }
        }, { projection:{ emailToken: 1, _id: 0 }, returnOriginal: false }
      );
      if(user==null){
        throw "Error interno, intentelo más tarde."
      }
      return user.emailToken;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  private async saveNewTokenInUserAccount(email: string): Promise<string>{
    try {
      const date: string = this.getDateOfExpireToken();
      const token: string = this.tokenCreator(64);
  
      const tokenUpdate: string = await this.updateToken(email, token, date);
  
      return tokenUpdate;
  
    } catch (error) {
      throw error;
    }
  }

  private getDateOfExpireToken(): string{
    try {
      const today =  new Date();
      today.setDate(today.getDate() + 1);
      return today.toString();
    } catch (err) {
      throw "Error al generar el tiempo de expiración del token, intentelo más tarde";
    }
  }

  private tokenCreator(length: number): string {
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
  }

  async updatePassword (token: string, password: string, confirmPassword: string): Promise<string> {
    try{
      const exist: boolean = await this.existToken(token);
      if( !exist ) throw "La validación no existe.";
      let psw = this.validateTwoPasswords(password, confirmPassword);
      let encryptedPsw = this.encryptPassword(psw);
      const response: boolean = await this.updatePasswordReset(encryptedPsw, token);
      if(!response) throw "Error al modificar la contraseña, intentelo más tarde.";
  
      return "Se modificó la contraseña";
  
    }catch(error){
      throw error;
    }
  }

  private validateTwoPasswords(password: string, confirmPassword: string): any {
    try{
        if (password != confirmPassword) throw new Error( 'Las contraseñas no coinciden' );
        if (password.length < 8) throw new Error ( 'La contraseña debe contener al menos 8 caracteres' )
        if( this.checkType(password) !== '2') throw 'La contraseña debe contener una mayúscula y minúscula.'
        if( password !== confirmPassword) throw 'Las contraseñas no coinciden';
        return password;
    }catch(error){
      throw new Error(error)
    }
  }

  private async existToken(token: string): Promise<boolean> { 
    try{
      if( await User.find({emailToken: token})){
        return true
      }else{
        return false
      }
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  private async updatePasswordReset(password: string, token: string): Promise<any>{
    try{

      let user = await User.findOneAndUpdate({emailToken:token},{password:password})
      if(user === null){
        throw "Error interno, intentelo más tarde."
      }
      return user.email;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  private encryptPassword(password: string): string{
    return Buffer.from(encodeURIComponent(escape(password))).toString("base64")
  }
}

const accessController = new AccessController();
export default accessController;
