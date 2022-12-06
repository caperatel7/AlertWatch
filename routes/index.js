const {Router}= require('express');
const clientSiteRouter = require('./clientSiteRoute.js');
const userRouter = require('./userRoutes.js');
const authRouter = require('./authRoutes.js');
const usersitesRouter = require('./usersites.js');

const router = Router();

router.use('/user', userRouter.router);
router.use('/clientsite', clientSiteRouter.router);
// router.use('/auth', authRouter.router);
router.use('/usersites', usersitesRouter.router);

module.exports = {router};