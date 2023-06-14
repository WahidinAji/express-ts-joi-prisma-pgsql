import express from 'express';
import routes from './routes';
import postRoute from './posts/routes';

const app = express();
const port = 3000;

// Other middleware and configurations

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());

// Use the user routes
app.use(routes);
app.use(postRoute);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
