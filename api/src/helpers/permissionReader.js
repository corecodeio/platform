module.exports = (data) => {
    if (!data) {
        return [[], []];
    }
    let permissionsList = [];
    let rolesList = [];
    for (let i = 0; i < data.length; i++) {
        rolesList.push(data[i].name);
        for (let e = 0; e < data[i].permissions.length; e++) {
            if (permissionsList.includes(data[i].permissions[e].name) === false) {
                permissionsList.push(data[i].permissions[e].name);
            }
        }
    }
    return [rolesList, permissionsList];
};
