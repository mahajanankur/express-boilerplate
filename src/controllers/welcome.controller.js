const express = require("express");
const { Logger } = require("motifer");
const { Response } = require("../dto/generic");
const logger = Logger.getLogger(__filename);
const { getStatus } = require("../services/welcome.service");

//Get router from express
const router = express.Router();

//Resources
router.get("/status", async (req, res, next) => {
    logger.info(`Inside status API's controller layer.`);
    let response = await getStatus();
    return res.json(new Response(true, "Service is up.", response));
});

//Make sure to export the router otherwise below error would be thrown 
//TypeError: Router.use() requires a middleware function but got a Object
module.exports = router;