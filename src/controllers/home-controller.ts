import { Request, Response, NextFunction } from 'express'

class HomeController{
  public index = async (req: Request, res: Response, next: NextFunction) => {

    try {
      res.render('index');
    } catch (error) {
      return next(error);
    }

    
  };  
}

const homeController = new HomeController();
export default homeController
