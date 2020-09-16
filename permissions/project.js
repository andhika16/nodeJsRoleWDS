const {
    ROLE
} = require("../model/data");



function canViewProject(user, projects) {
    return (
        user.role === ROLE.ADMIN ||
        projects.userId === user.id
    )

}

function scopedProject(user, projects) {
    if (user.role === ROLE.ADMIN) return projects
    return projects.filter(project => project.userId === user.id)

}


function canDeleteProject(user, projects) {
    return projects.userId === user.id
}


module.exports = {
    canViewProject,
    scopedProject,
    canDeleteProject
}