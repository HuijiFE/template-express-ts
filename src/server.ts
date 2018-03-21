/**
 * Configure app and startup server.
 */

import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import * as logger from 'morgan';
import { Server } from 'http';
import * as routers from './routers';

// region ======== Express Configuration ========

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: '.env.example' });
}

const port: string | number = process.env.PORT || 7100;

const app: express.Express = express();
app
  .use(compression())
  .use(cors()) // CORS
  .use(logger('dev'))
  .use((request, response, next) => {
    // CORS 跨域
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use('/', (request, response, next) =>
    response.send('Template Express on TypeScript.')
  );

Object.entries(routers).forEach(([name, router]) => {
  app.use(`/${name}`, router);
});

// endregion

// region ======== Error Handler ========

app.use((request, response, next) => {
  const error: Error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use(
    (
      error: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) =>
      response.status(error.status || 500).json({
        status: 'error',
        message: error.message,
        error: error,
      })
  );
}

// production error handler
// no stacktrace leaked to user
app.use(
  (
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) =>
    response.status(error.status || 500).json({
      status: 'error',
      message: error.message,
      error: {},
    })
);

// endregion

// region ======== Startup Server ========

// tslint:disable:no-console
const server: Server = app.listen(port, (error: Error) => {
  if (error) {
    console.log(error);

    return;
  }
  console.log(`  Listening at http://localhost:${port} in ${process.env.NODE_ENV} mode.`);
  console.log('  Press CTRL+C to stop\n');
});

export default server;

// endregion
