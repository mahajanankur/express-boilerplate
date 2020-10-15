const { Logger } = require("motifer");
const logger = Logger.getLogger(__filename);
const { Response } = require("../dto/generic");

exports.sendExceptionResponse = (err, req, res, next) => {
    logger.debug("Exception advice invoked.")
    return res.status(404).json(new Response(false, "Generic exception advice.", err.message));
    // next();
}