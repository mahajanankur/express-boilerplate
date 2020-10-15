const config = require("config");
const { authEnabled, hardCodedToken } = config.get("authentication");
const { Logger } = require("motifer");
const logger = Logger.getLogger(__filename);

// TODO - Implement any Redis here in later point of time.
exports.authorize = (role) => {
    return async (req, res, next) => {
        if (authEnabled) {
            logger.debug(`Routers access to the role: ${role}`);
            let token = req.get("Authorization");
            if (!token) {
                logger.error(`Authorization header is missing.`);
                return next(new Error(`Authorization header is missing.`));
            }
            try {
                // Implemented auth layer here.
                let isVerified = token === hardCodedToken ? true : false;
                //JWT check
                if (!isVerified) {
                    logger.error(`Invalid auth token: ${token}`);
                    return next(new Error(`Invalid auth token.`));
                }
            } catch (error) {
                logger.error(`Invalid auth token: ${token}`);
                return next(new Error(`Invalid auth token.`));
            }

            next();
        } else {
            logger.info(`Authentication is disabled.`);
            next();
        }

    }
}