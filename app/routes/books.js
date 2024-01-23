const router = require('express').Router();
const booksService = require("../services/author")

router.post('/createBooks', booksService.createBooks);
router.delete('/deleteBook/:id', booksService.deleteBooks);
router.get('/books/', booksService.getBooks);
router.get('/genre/:genre', booksService.getBooksByGenre);
router.get('/year/:yearStart/:yearEnd', booksService.getBooksByPublishingYear);
router.get('/country/:country', getAllBooksByAuthorCountry);

module.exports = router;