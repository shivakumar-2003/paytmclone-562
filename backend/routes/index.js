const express = require('express');
const { userRouter } = require('./user.js');
const { accountRouter } = require('./account.js');
const { authMiddleware } = require('../middleware.js');
// use to handle requests coming rom /api/v1
const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = router;