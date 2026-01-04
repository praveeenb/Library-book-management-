const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.post("/insert-multiple", controller.insertMultipleBooks);
router.get("/", controller.getAllBooks);
router.get("/category/:category", controller.getBooksByCategory);
router.get("/after/2015", controller.getBooksAfter2015);

router.patch("/copies/:id", controller.updateCopies);
router.patch("/category/:id", controller.updateCategory);

router.delete("/delete/:id", controller.deleteBookIfZero);

module.exports = router;
