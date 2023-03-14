module.exports = async ({ event }) => {
    try {
        console.log('team_join');
        console.log(event.user);
    } catch (error) {
        console.log(error);
    }
};
