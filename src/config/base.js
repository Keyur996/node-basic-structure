export const getBaseConfig = (env) => {
    return {
        env: env,
        isDev: env === 'dev',
        isTest: env === 'test',
        port: 3012
    }
}