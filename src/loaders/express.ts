import express from 'express';
import session from 'express-session';
import homeRouter from '../routes/home-router';
import accessRouter from '../routes/access-router'
import { expressKeys } from '../config/key';
import path from 'path';
import passport from "./passport";
import flash from 'express-flash';
import { storeMongo } from './mongo';

/*  --------------------------------------------------
 *
 *  Instance server with express
 *
 *  --------------------------------------------------
 *  This file is implements in layer infrastucture
 *  --------------------------------------------------
 *
 */

export async function startServer(){
  const app = express();

  app.get('/status', ( req: any, res: any ) => { res.status(200).end(); });
  app.head('/status', ( req: any, res: any ) => { res.status(200).end(); });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  
  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());

  // Is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code:
  app.use(express.urlencoded({ extended: true }));

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: expressKeys.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, 
    store: storeMongo(session)
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req: any, res: any, next: any) => {
    app.locals.user = req.user;
    res.locals.user = app.locals.user
    next();
  });
  app.use(flash());
  //Routes
  app.use('/', homeRouter);
  app.use('/', accessRouter);

  app.use('/', express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));
  app.set('views', path.join(__dirname,'../views'));

  app.set('host', expressKeys.host);
  app.set('port', expressKeys.port);
  app.set('view engine', 'pug');
  app.listen(app.get('port'), () => {
    console.log(`
      ########################################
      ║ 🛡️   Server listening on port: ${app.get('port')} 🛡️ ║
      ########################################
    `);
  }).on('error', ( error: any ) => {
    console.log(error);
  });
  return app;
}
