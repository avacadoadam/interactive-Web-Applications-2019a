const fs = require('fs');
express = require('express');
var http = require('http');

//14 - 20 error code = database failure
let content = null;
let database = {};
try {
    content = readDatabase();
} catch (e) {
    console.error(e);
    process.exit(14);
}

if (content || content === '') {
    console.error('Database is empty');
    process.exit(15);
}

try {
    database = JSON.parse(content);
} catch (e) {
    console.log("Database is not json or is corrupted");
    console.error(e);
    process.exit(16);
}

let app = express();
let server = http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/blog', (req, res) => {
});
app.post('/blog', (req, res) => {
});
app.put('/blog', (req, res) => {
});
app.delete('/blog', (req, res) => {
});

//This is where we as the server to be listening to user with a specified IP and Port
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});

/**
 * Reads a content from a json file where the database data resides.
 * The path given is a relative path to this file.
 * A databaseFile is not need to try and stay true to functional programming.
 * RETURNS the content of the file or a err
 * If insufficient permission and or file does not exits.
 */
function readDatabase(databaseFileName = 'blogDatabase.json') {
    fs.readFile(databaseFileName, 'utf8', function (err, contents) {
        if (err) {
            console.error("Could not find the " + databaseFileName + " file or permission was not given");
            return err;
        } else {
            return contents;
        }
    });
}


