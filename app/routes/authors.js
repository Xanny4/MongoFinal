const router = require('express').Router();
const authorsService = require("../services/authors")

router.post('/createAuthor', authorsService.createAuthor);
router.put("/updateAuthor/:id", authorsService.updateAuthor);
router.get("/books/:id", authorsService.getAllBooks);


module.exports = router;