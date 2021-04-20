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
      const {body} = req
      const newUser = new User({
        email: body.email, 
        password: body.password, 
        name: body.name,
        type: 1
      })
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
      const user = await User.findOne({email: email});
      if(!user){
        req.flash('errors', 'El usuario no existe');
        return res.redirect('back');
      } 
      const token: string = await user.createToken();
      const expireToken: string = await user.getDateOfExpireToken(64);
      user.emailToken = token
      user.expireToken = expireToken
      await user.save()
      const subject: string ="Starter: Recupera tu contraseña"

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
      const { password } = req.body;
      const user = await User.findOne({token:token});
      if(!user){
        req.flash('errors', 'El usuario no existe');
        return res.redirect('back');
      } 
      await user.comparePassword(password)
      await User.findByIdAndUpdate(user._id,{password:password})
      req.flash('success', "Se modificó correctamente su contraseña.")
      return res.redirect('/login');
  
    }catch(error){
      req.flash('errors', error.message);
      return res.redirect('back');
    }
  }

}

const accessController = new AccessController();
export default accessController;
