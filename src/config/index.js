import chalk from "chalk";
import { merge } from "lodash";
import { getBaseConfig } from './base';

const env = process.env.NODE_ENV || 'dev';
const getEnvConfig = () => {
    const log = console.log;
    try {
        log(chalk.green(`env for This => ${env}`))
        return require(`./${env}` ).config;
    } catch (err) {
        log(chalk.red('Error Inside Config. File not Found. Please Check File Name'));
        log(chalk.yellow('Loading Default Development Config'));
        return require('./dev').config;
    }
}

export const config = Object.freeze(merge(getBaseConfig(env), getEnvConfig()));