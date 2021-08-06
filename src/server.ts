import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { errorHandler } from './common/errorValidation/error';
import { NotFoundError } from './common/errorValidation/errors';
import { validationRules } from './common/validations';
import { validateRequest } from './common/validations/validateRequest';

const fileUpload = multer();

export function initMiddleWare(app): void {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(morgan('combined'));

  Routes.forEach((route) => {
    app[route.method](
      route.route,
      validationRules(route.action), // validate the request params using the validationRules based on action string
      validateRequest,
      route?.uploadType || fileUpload.none(),
      (req: Request, res: Response, next) => {
        const result = new route.controller()[route.action](req, res, next);
        if (result instanceof Promise) {
          result
            .then((result) => (result !== null && result !== undefined ? res.send(result) : undefined))
            .catch((err) => {
              next(err);
            });
        } else if (result !== null && result !== undefined) {
          res.send(result);
        }
      },
    );
  });
  app.all('*', (req: Request) => {
    console.log('request url', req.url);
    throw new NotFoundError();
  });
  app.use(errorHandler);
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
