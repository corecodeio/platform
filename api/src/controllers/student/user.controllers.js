const clientStytch = require('./../../utils/stytch');
const { User } = require('./../../utils/db');
//Sign Up
module.exports.signUp = (req, res, next) => {
    const { email, password } = req.body;
    clientStytch.passwords
        .create({
            email,
            password,
            session_duration_minutes: 60
        })
        .then(async (resp) => {
            await User.create({
                id: resp.session.user_id,
                email: email
            });
            return res.status(200).json({
                successful: true,
                user: {
                    first_name: '',
                    last_name: '',
                    email: email,
                    confirmed_email: false,
                    phone: '',
                    confirmed_phone: false,
                    country: '',
                    city: '',
                    address: '',
                    linkedin_url: ''
                },
                token: resp.session_token,
                message: 'successful registration'
            });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//log In
module.exports.logIn = (req, res, next) => {
    const { email, password } = req.body;
    clientStytch.passwords
        .authenticate({ email, password, session_duration_minutes: 60 })
        .then(async (resp) => {
            try {
                const userResult = await User.findOne({
                    where: { id: resp.session.user_id }
                });
                if (!userResult) {
                    return res.status(200).json({ successful: false, message: 'id not found' });
                }
                if (userResult.locked) {
                    return res.status(200).json({ successful: false, message: 'user blocked' });
                }
                res.status(200).json({
                    successful: true,
                    user: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email,
                        confirmed_email: userResult.confirmed_email,
                        phone: userResult.phone,
                        confirmed_phone: userResult.confirmed_phone,
                        country: userResult.country,
                        city: userResult.city,
                        address: userResult.address,
                        linkedin_url: userResult.linkedin_url
                    },
                    token: resp.session_token,
                    message: 'successful login'
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//check token
module.exports.checkToken = async (req, res, next) => {
    try {
        const userResult = await User.findOne({
            where: { id: req.user.id }
        });
        if (!userResult) {
            return res.status(200).json({ successful: false, message: 'id not found' });
        }
        res.status(200).json({
            successful: true,
            user: {
                first_name: userResult.first_name,
                last_name: userResult.last_name,
                email: userResult.email,
                confirmed_email: userResult.confirmed_email,
                phone: userResult.phone,
                confirmed_phone: userResult.confirmed_phone,
                country: userResult.country,
                city: userResult.city,
                address: userResult.address,
                linkedin_url: userResult.linkedin_url
            }
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({ successful: false, message: 'error server' });
    }
};
//Recover Password
module.exports.recoverPassword = (req, res, next) => {
    const { email } = req.body;
    clientStytch.passwords
        .resetByEmailStart({ email })
        .then((resp) => {
            return res.status(200).json({ successful: true, message: 'mail sent successfully' });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//MagicLinks
module.exports.magicLinks = async (req, res, next) => {
    const { token } = req.body;
    clientStytch.magicLinks
        .authenticate(token, { session_duration_minutes: 60 })
        .then(async (resp) => {
            try {
                const userResult = await User.findOne({
                    where: { id: resp.session.user_id }
                });
                if (!userResult) {
                    return res.status(200).json({ successful: false, message: 'id not found' });
                }
                if (userResult.locked) {
                    return res.status(200).json({ successful: false, message: 'user blocked' });
                }
                res.status(200).json({
                    successful: true,
                    user: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email,
                        confirmed_email: userResult.confirmed_email,
                        phone: userResult.phone,
                        confirmed_phone: userResult.confirmed_phone,
                        country: userResult.country,
                        city: userResult.city,
                        address: userResult.address,
                        linkedin_url: userResult.linkedin_url
                    },
                    token: resp.session_token,
                    message: 'successful login'
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//Validate Email
module.exports.validateEmail = async (req, res, next) => {
    const { password, token } = req.body;
    clientStytch.passwords
        .resetByEmail(token, password, { session_duration_minutes: 60 })
        .then(async (resp) => {
            try {
                const userResult = await User.findOne({
                    where: { id: resp.session.user_id }
                });
                if (!userResult) {
                    return res.status(200).json({ successful: false, message: 'id not found' });
                }
                if (userResult.locked) {
                    return res.status(200).json({ successful: false, message: 'user blocked' });
                }
                res.status(200).json({
                    successful: true,
                    user: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email,
                        confirmed_email: userResult.confirmed_email,
                        phone: userResult.phone,
                        confirmed_phone: userResult.confirmed_phone,
                        country: userResult.country,
                        city: userResult.city,
                        address: userResult.address,
                        linkedin_url: userResult.linkedin_url
                    },
                    token: resp.session_token,
                    message: 'new password registered'
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//Update Account
module.exports.updateAccount = async (req, res, next) => {
    const { first_name, last_name } = req.body;
    const id = req.user.id;
    const params = {
        name: {
            first_name: first_name,
            last_name: last_name
        }
    };
    clientStytch.users
        .update(id, params)
        .then(async () => {
            try {
                const userResult = await User.findOne({
                    where: { id: req.user.id }
                });
                userResult.first_name = first_name ? first_name : '';
                userResult.last_name = last_name ? last_name : '';
                await userResult.save();
                res.status(200).json({
                    successful: true,
                    message: 'account updated successfully',
                    user: { first_name: userResult.first_name, last_name: userResult.last_name }
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//Add Phone
module.exports.addPhone = async (req, res, next) => {
    try {
        const userResult = await User.findOne({
            where: { id: req.user.id }
        });
        if (userResult.phone) {
            return res.status(200).json({
                successful: false,
                message: 'already have a registered phone'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ successful: false, message: 'error server' });
    }
    const { phone } = req.body;
    clientStytch.otps.whatsapp
        .send({
            phone_number: phone,
            user_id: req.user.id
        })
        .then(async () => {
            try {
                const userResult = await User.findOne({
                    where: { id: req.user.id }
                });
                userResult.phone = phone;
                userResult.confirmed_phone = false;
                await userResult.save();
                res.status(200).json({
                    successful: true,
                    message: 'successfully registered phone',
                    user: { phone: phone }
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//Add Phone
module.exports.RemovePhone = async (req, res, next) => {
    try {
        const userResult = await User.findOne({
            where: { id: req.user.id }
        });
        if (!userResult.phone) {
            return res.status(200).json({
                successful: false,
                message: 'no registered phone'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ successful: false, message: 'error server' });
    }
    const { phone } = req.body;
    clientStytch.otps.whatsapp
        .send({
            phone_number: phone,
            user_id: req.user.id
        })
        .then(async () => {
            try {
                const userResult = await User.findOne({
                    where: { id: req.user.id }
                });
                userResult.phone = phone;
                userResult.confirmed_phone = false;
                await userResult.save();
                res.status(200).json({
                    successful: true,
                    message: 'successfully registered phone',
                    user: { phone: phone }
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//Confirmed Email
module.exports.confirmedEmail = async (req, res, next) => {
    res.status(200).json({ successful: false, message: 'Confirmed Email' });
};
//Update Profile
module.exports.updateProfile = async (req, res, next) => {
    try {
        const { country, city, address, linkedin_url } = req.body;
        const userResult = await User.findOne({
            where: { id: req.user.id }
        });
        if (userResult.country !== country) {
            userResult.country = country ? country : '';
        }
        if (userResult.city !== city) {
            userResult.city = city ? city : '';
        }
        if (userResult.address !== address) {
            userResult.address = address ? address : '';
        }
        if (userResult.linkedin_url !== linkedin_url) {
            userResult.linkedin_url = linkedin_url ? linkedin_url : '';
        }
        await userResult.save();
        res.status(200).json({
            successful: true,
            message: 'profile updated successfully',
            user: {
                country: userResult.country,
                city: userResult.city,
                address: userResult.address,
                linkedin_url: userResult.linkedin_url
            }
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({ successful: false, message: 'error server' });
    }
};
