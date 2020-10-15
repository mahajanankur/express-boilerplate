const { Logger } = require("motifer");
const logger = Logger.getLogger(__filename);

const { findStatusById } = require("../repositories/welcome.repo");

const getStatus = async () => {
    logger.info(`Inside status API's service layer.`);
    let response = await findStatusById(10);
    return response;
}

module.exports = { getStatus }