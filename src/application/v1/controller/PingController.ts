import { Request, Response } from 'express';

export default class PingController {
  public execute = (_request: Request, response: Response) => {
    response.status(200).json({ ok: true });
  };
}
