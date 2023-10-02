const pinoHttp = require("pino-http");
const {nanoid} = require("nanoid");


const level = process.env.LOG_LEVEL || "info"

const nodeEnv = process.env.NODE_ENV || 'development'
const prettyPrint = nodeEnv === 'development'

function getCentralTimeISOString() {
    const date = new Date();
    const offset = date.getTimezoneOffset() ;  // Adjusting for Central Time Zone (GMT-6)
    const centralDate = new Date(date.getTime() - offset * 60 * 1000);
    return centralDate.toISOString().split('.')[0] + 'Z';  // To exclude milliseconds from the ISO string
}


const logger = pinoHttp({
    genReqId:(request) => request.headers['x-request-id'] || nanoid(),
    level,
    prettyPrint,
    timestamp: () => `,"time":"${getCentralTimeISOString()}"`,
});

module.exports = logger