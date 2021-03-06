const express = require('express')
const router = express.Router()
const {
    projects
} = require('../model/data')
const {
    authUser
} = require('../basicAuth');
const {
    canViewProject,
    scopedProject,
    canDeleteProject
} = require('../permissions/project');

router.get('/', authUser, (req, res) => {
    res.json(scopedProject(req.user, projects))
});

router.get('/:projectId', authUser, setProject, getProject, (req, res) => {
    res.json(req.project)
});

router.delete('/:projectId', authUser, setProject, authDeleteProject, (req, res) => {
    res.send('Deleted Project')
});





function getProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not Allowed')

    }

    next()
}

function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId)
    req.project = projects.find(project => project.id === projectId)

    if (req.project == null) {
        res.status(404)
        console.log(projectId);
        return res.send('Project not found');
    }
    next()
}

function authDeleteProject(req, res, next) {
    if (!canDeleteProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not Allowed')

    }

    next()
}

module.exports = router