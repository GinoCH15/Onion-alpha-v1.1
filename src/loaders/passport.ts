import passport from 'passport';
import User from "../models/User";


passport.serializeUser((user, done) => {
  done(undefined, user);
});

passport.deserializeUser(async(user:any, done) => {
  try {
    let newUser:any = {}
    if (user){
      newUser = await User.findById(user._id);
      user=newUser
      return done(null, user);
    }
  } catch (error) {
    return done(error, user);
  }
});
export default passport;
