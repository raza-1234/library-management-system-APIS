const express = require("express");
const router = express.Router();
const {
    getAllBooks,
    addNewBook,
    updateBook,
    deleteBook,
    } = require("../controllers/bookController")
router.get("/", getAllBooks);
router.post("/", addNewBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;