export function validateRegister ( req: any, res: any, next: any): any{
  try{
    const { email, password, password2 } = req.body;
    if( email === '' || password === '' || password2 === '' ) throw 'Faltan campos requeridos'
    if( ! /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) ) throw 'El correo está mal ingresado';
    if( password.length < 8) throw 'La contraseña debe contener al menos 8 caracteres';
    if( checkType(password) !== '2') throw 'La contraseña debe contener al menos una mayúscula y una minúscula.'
    if( password !== password2) throw 'Las contraseñas no coinciden';
    next();
  }catch(error){
    req.flash('errors', error);
    return res.render('Access/login', {flag: 1})
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
