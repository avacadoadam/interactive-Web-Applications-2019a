const fs = require('fs');
express = require('express');
let http = require('http');

let database = {};

let app = express();
let server = http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

content = readDatabase()
    .then(database => {
        this.database = database;
        server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
            var addr = server.address();
            console.log("Server listening at", addr.address + ":" + addr.port);
        });
    });

app.get('/blog', (req, res) => {

});
app.post('/blog', (req, res) => {
});
app.put('/blog', (req, res) => {
});
app.delete('/blog', (req, res) => {
});

/**
 * Reads a content from a json file where the database data resides.
 * The path given is a relative path to this file.
 * The databaseFile para is not need to try and stay true to functional programming.
 * Will fail if insufficient permission and or file does not exits.
 * @param databaseFileName optional database file name
 * @returns {Promise<Object>} returns the parse database json file.
 */
async function readDatabase(databaseFileName = 'blogDatabase.json') {
    return new Promise((resolve, reject) => {
        fs.readFile(databaseFileName, 'utf8', (err, contents) => {
            if (err) {
                logAndExit(14, "Could not find the " + databaseFileName + " file or permission was not given", err);
            } else {
                console.log(contents);
                if (!contents || contents === '') {
                    logAndExit(15, "Database is empty");
                }
                let database = null;
                try {
                    database = JSON.parse(contents);
                } catch (e) {
                    logAndExit(16, "Database is not json or is corrupted", e);
                }
                resolve(database);
            }
        });
    });
}

/**
 * A helper function to display a error message and exit system with status code
 * @param statusCode Exit code
 * @param errMsg Error message
 * @param error optional stack trace
 */
function logAndExit(statusCode, errMsg, error = null) {
    console.error(errMsg);
    if (error) console.log(error);
    process.exit(statusCode);
}


