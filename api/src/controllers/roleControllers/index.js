const createRole = require('./createRole.controller');
const listRoles = require('./listRoles.controller');
const deleteRole = require('./deleteRole.controller');
const removeRoleAssociation = require('./removeRoleAssociation.controller');

module.exports = { createRole, listRoles, deleteRole, removeRoleAssociation };
