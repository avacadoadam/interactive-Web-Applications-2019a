const fs = require('fs');


/**
 * Reads a content from a json file where the database data resides.
 * The path given is a relative path to this file.
 * A databaseFile is not need to try and stay true to functional programming.
 * RETURNS the content of the file or a err
 * If insufficient permission and or file does not exits.
 */
function readDatabase(databaseFileName) {
    let fileName = databaseFileName || 'blogDatabase.json';
    fs.readFile(fileName, 'utf8', function (err, contents) {
        if (err) {
            console.error("Could not find the " + fileName + " file or permission was not given");
            return err;
        } else {
            return contents;
        }
    });
}

