import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

const port = parseInt(process.env.PORT, 10) || 9001;

app.listen(port, () =>
  console.log(`Running on localhost: 
  ${port} Node Env: ${process.env.NODE_ENV}`));

export default app;
