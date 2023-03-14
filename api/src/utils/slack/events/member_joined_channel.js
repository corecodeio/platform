module.exports = async ({ event, say }) => {
    try {
        console.log('member_joined_channel');
        console.log(event.user);
    } catch (error) {
        console.log(error);
    }
};
