const fs = require('fs');

//14 - 20 error code = database failure

let content = null;
let database = {};
try {
    content = readDatabase();
} catch (e) {
    console.err(e);
    process.exit(14);
}

if (content || content === '') {
    console.err('Database is empty');
    process.exit(15);
}

try {
    database = JSON.parse(content);
} catch (e) {
    console.log("Database is not json or is corrupted");
    console.err(e);
    process.exit(16);
}


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

