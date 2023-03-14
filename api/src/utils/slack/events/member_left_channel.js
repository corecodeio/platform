module.exports = async ({ event }) => {
    try {
        console.log('member_left_channel');
        console.log(event.user);
    } catch (error) {
        console.log(error);
    }
};
