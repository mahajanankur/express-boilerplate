const { Logger } = require("motifer");
const logger = Logger.getLogger(__filename);

//First page is at 0th index.
exports.getPagination = async (req) => {
    let page = req.query && req.query.page && req.query.page >= 0 ? parseInt(req.query.page) : 0;
    let size = req.query && req.query.size && req.query.size >= 0 ? parseInt(req.query.size) : 10;
    let pagination = {
        offset: (page * size),
        limit: size
    };
    logger.debug("Pagination object is ", pagination);
    return pagination;
}