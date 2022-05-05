import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from './config';
import chalk from 'chalk';
import { setMongo } from './utils/db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const start = async () => {
    try {
        await setMongo();
        const port = config.port || 3000;
        app.listen(port, () => console.log(chalk.green(`Server is running on ${port}.`, chalk.blue(`Visit http://localhost:${port}`))))
    } catch (err) {
        console.log(chalk.red(`Opps !! Something Went Wrong !! --> ${err}`));
    }
}

export default start;
