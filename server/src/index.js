import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import * as http from 'http';


const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


const port = parseInt(process.env.PORT, 10) || 9001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

app.get('/', (req, res) => {
  res.status(200).send('ok it wors');
});

console.log(`Server is up @ ${port}`);
