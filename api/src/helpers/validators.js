//validate ID
module.exports.validateID = (uuid) => {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(uuid);
};
//validate Number
module.exports.validateNumber = (number) => {
    const regex = /^[0-9]*$/;
    return regex.test(number);
};

//validate Email
module.exports.validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
