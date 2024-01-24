const router = require('express').Router();
const booksService = require("../services/books")

router.post('/createBooks', booksService.createBooks);
router.delete('/deleteBook/:id', booksService.deleteBook);
router.get('/all/', booksService.getBooks);
router.get('/genre/:genre', booksService.getBooksByGenre);
router.get('/year/:yearStart/:yearEnd', booksService.getBooksByPublishingYear);
router.get('/country/:country', booksService.getBooksByAuthorCountry);

module.exports = router;