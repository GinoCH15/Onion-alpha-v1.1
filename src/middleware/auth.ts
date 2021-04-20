import {Request, Response, NextFunction} from 'express'

export function isAdmin( req: any, res: any, next: any){
  if(!req.user){
    req.flash('errors', 'Debe iniciar sesión para poder ver esta información');
    return res.redirect('/login');
  }
  if(req.user.type == 0){
    return next();
  }
  req.flash('errors', 'Debe ser un administrador para poder ver esta información' );
  return res.redirect('back');
}

export function isLogged(req: any, res: any, next: any){
  if(req.user){

    let route: string = '';
    switch(req.user.type){
      case 0: 
        route = '/admin/';
        break;
      case 1:
        route = '/usuario/';
        break;
      default:
        route = '/salir';
        break
    }

    //req.flash('info', 'Ya esta logeado!' );
    return res.redirect(route);
  }
  return next();
}
