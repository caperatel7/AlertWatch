const {Router}= require('express');
const {allUsers, getUserById, deleteUserById, createUser, updateUserPassword, updateUser} = require('../controls/user');

const router = Router();


router.get('/', allUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.post('/', createUser);
router.patch('/password', updateUserPassword);
router.put('/', updateUser);


// export router
module.exports = {router};