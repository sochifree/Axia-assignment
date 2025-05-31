const express = require('express');
const { getAllUser, signUp, login, update, deleteUser } = require('../controllers/user')

const router = express.Router()

router.get('/get', getAllUser)

router.post('/signUp', signUp)

router.post('/login', login)

router.put('/update', update)

router.delete('/delete', deleteUser)


module.exports = router;
    