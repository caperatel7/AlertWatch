const {Router}= require('express');
const {allClientSites, getClientSiteById, deleteClientSiteById, createClientSite, updateClientSiteDisplayName} = require('../controls/site.js');

const router = Router();

//client site routes
router.get('/', allClientSites);
router.get('/:id', getClientSiteById);
router.delete('/:id', deleteClientSiteById);
router.post('/', createClientSite);
router.patch('/display_name', updateClientSiteDisplayName);

//export default router;
module.exports = {router};