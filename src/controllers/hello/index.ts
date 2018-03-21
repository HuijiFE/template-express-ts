import * as express from 'express';

/**
 * Hello World
 */
const hello: express.Router = express.Router();

hello.get('/', (request, response, next) => {
  response.send('Hello World');
});

export default hello;
