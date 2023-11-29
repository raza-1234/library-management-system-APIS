const express = require("express");
const router = express.Router();
const {assignBook, returnBook} = require("../controllers/assignBookController")

router.post("/v1/:id/assignedBook", assignBook);
router.delete("/v1/:id/returnBook", returnBook)


module.exports = router;