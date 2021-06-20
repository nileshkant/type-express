import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

export function initMiddleWare(app): void {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use(morgan('combined'));

  Routes.forEach((route) => {
    app[route.method](route.route, (req: Request, res: Response, next: () => void) => {
      const result = new route.controller()[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });
}

export class Server {
  private readonly _app: express.Application = express();

  public constructor() {
    initMiddleWare(this._app);
  }

  /**
   * Get Express app
   *
   * @returns {express.Application} Returns Express app
   */
  public get app(): express.Application {
    return this._app;
  }
}
