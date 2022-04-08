const express = require('express');
const router = express.Router();
const {register, updatePassword} = require('../controllers/users');

router.post('/', register);
router.patch('/', updatePassword);

module.exports = router;
