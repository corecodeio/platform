const http = require('./http.js');
const { db } = require('./utils/db.js');
const { serverConfig } = require('./config/index.js');

db.sync({ force: false })
    .then(async () => {
        http.listen(serverConfig.port, () => {
            console.log(`Server listening on port: ${serverConfig.port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
