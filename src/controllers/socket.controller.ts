import { Request, Response } from 'express';

export const rtdataController = {
  handleRequest: (req: Request, res: Response) => {
    res.sendStatus(200); 
  }
};

export const averagesController = {
  handleRequest: (req: Request, res: Response) => {
    res.sendStatus(200); 
  }
};