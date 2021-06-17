import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Routes } from './routes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
// import { User } from "./entity/User";

createConnection()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    try {
      const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
        flags: 'a',
      });
      app.use(morgan('combined', { stream: accessLogStream }));
    } catch (err) {
      console.log(err);
    }
    app.use(morgan('combined'));

    // register express routes from defined application routes
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

    // setup express app here
    // ...
    const port = process.env.PORT || 4000;
    // start express server
    app.listen(port);

    // insert new users for test
    // uncomment below lines to insert a record
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));

    console.log(`Express server has started on port ${port}.`);
  })
  .catch((error) => console.log(error));
