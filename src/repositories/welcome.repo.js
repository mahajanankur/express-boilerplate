const { Logger } = require("motifer");
const logger = Logger.getLogger(__filename);

exports.findStatusById = async (id) => {
    logger.info(`Inside status API's repository layer.`);
    // Call the persistence layer by ORM or Client.
    let result = { id };
    return result;
}