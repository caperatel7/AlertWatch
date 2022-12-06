const {Router} = require('express');
const { createUser } = require('../controls/user.js');
const {getClientSitesByUsername,getAllUserAndSites, getAllSitesAndUsers, createUserSite, deleteUserSite} = require('../controls/usersites.js');


const router = Router();

router.get('/sites', getAllSitesAndUsers);
router.get ('/user', getAllUserAndSites);
router.get ('/link', createUserSite);
router.get ('/unlink' , deleteUserSite);
router.get ('/:username', getClientSitesByUsername);

module.exports = {router};