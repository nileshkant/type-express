import 'dotenv/config';
import 'reflect-metadata';
// import { createConnection } from 'typeorm';
import { createServer, Server as HttpServer } from 'http';
import { Application } from 'express';
import { Server } from './server';
import { dbConnection } from './dbServer';

let retries = 5;
async function createDbConection() {
  while (retries) {
    try {
      const connect = await dbConnection();
      if (connect.isConnected) {
        const app: Application = new Server().app;
        const server: HttpServer = createServer(app);
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);

        // setup express app here
        // ...
        const port = process.env.PORT || 4000;
        // start express server
        server.listen(port);

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
      }
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

createDbConection();
