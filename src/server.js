import { config } from './config';
import chalk from 'chalk';
import { setMongo } from './utils/db';
import app from './app';
import { setRoutes } from './resources/index';
const start = async () => {
    try {
        await setMongo();
        setRoutes(app);
        const port = config.port || 3000;
        app.listen(port, () => console.log(chalk.green(`Server is running on ${port}.`, chalk.blue(`Visit http://localhost:${port}`))))
    } catch (err) {
        console.log(chalk.red(`Opps !! Something Went Wrong !! --> ${err}`));
    }
}

export default start;
