export function validateReset ( req: any, res: any, next: any): any{
  try{
    const {token} =  req.params
    const { password, password2 } = req.body;
    if(!token||token === ''){
      req.flash("errors", 'Es necesario un token');
      return res.redirect('/');
    }
    if(password === '' || password2 === '' ) throw 'Faltan campos requeridos'
    if( password.length < 8) throw 'La contraseña debe contener al menos 8 caracteres';
    if( checkType(password) !== '2') throw 'La contraseña debe contener al menos una mayúscula y una minúscula.'
    if( password !== password2) throw 'Las contraseñas no coinciden';
    next();
  }catch(error){
    req.flash('errors', error);
    return res.render('Access/login')
    //return res.redirect('back');
  }
}  


function checkType(mensaje: string) {
  mensaje = mensaje.trim();
  const regxs = {
    "lower": /^[a-z0-9 ]+$/,
    "upper": /^[A-Z0-9 ]+$/,
    "upperLower": /^[A-Za-z0-9 ]+$/
  }

  if (regxs.lower.test(mensaje)) { return '0'; }
  if (regxs.upper.test(mensaje)){ return '1'; }
  if (regxs.upperLower.test(mensaje)){ return '2'; }

  return -1;
}
