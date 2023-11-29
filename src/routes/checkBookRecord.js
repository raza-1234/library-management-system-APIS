const express = require("express");
const router = express.Router();
const {getBookDetail, returnBook} = require("../controllers/bookDetailController")

router.get("/:id/getBookRecord", getBookDetail)

module.exports = router;