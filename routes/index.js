const express = require('express');
const router = express.Router();
const {
    authUser,
    AuthRole
} = require('../basicAuth');
const data = require('../model/data');
const {
    ROLE
} = require('../model/data');

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const userId = req.body.userId;
    res.send(userId);
    res.end();
})

router.get('/', (req, res) => {
    res.send('Home Page')
})

router.post('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page')
})

router.get('/admin', authUser, AuthRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page')
})


module.exports = router;