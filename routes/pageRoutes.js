const express = require('express');
const pageController = require('../controllers/pageController')

const router = express.Router();

router.route('/posts').post(pageController.postArticle);
router.route('/get').get(pageController.getArticle);
router.route('/:slug').get(pageController.articlePage);
router.route('/delete/:id').delete(pageController.deleteArticle);
router.route('/article/:id').patch(pageController.editArticle);

module.exports =router;