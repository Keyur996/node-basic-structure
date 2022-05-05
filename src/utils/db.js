import chalk from "chalk";
import { connect } from "mongoose";
import { config } from "../config";

export const setMongo = async () => {
    try {
        await connect(config.dbUrl || '')
        console.log('MongoDB Connected.');
    } catch (err) {
        console.log(chalk.red(`Opps ! Someting Went Wrong Connection Error !!`, err));
        throw new Error(`DB connection Error --> ${err}`);
    }
}