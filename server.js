const express = require('express')
const app = express()
const {
    users
} = require('./model/data');
const projectRouter = require('./routes/projects');
const session = require('express-session')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(setUser);
app.use('/projects', projectRouter)

app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))


function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}

app.listen(3000, (port) => {
    console.log('connected');
})