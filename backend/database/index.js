const fs = require('fs');


//of course the database is not optimised as every write will need the whole database to be written again
//which will quickly become a problem as the database grows
//it is also not consistent,isolated or atomic so calling it a database is a stretch.

//the promise in readDatabase is more or less a callback may be bad pratice and does not return any errors, it may be better pratice
//to return a error object {'statuscode','error message'} and handle it in blog.js

//read blog at index
//edit blog at index
//write blog at index
let database = {};
let index = 0; // the highest index in the database for blogs


/**
 * Reads a content from a json file where the database data resides.
 * The path given is a relative path to this file.
 * The databaseFile para is not need to try and stay true to functional programming.
 * Will fail if insufficient permission and or file does not exits.
 * @param databaseFileName optional database file name
 * @returns {Promise<boolean>} returns the parse database json file.
 */
function readDatabase(databaseFileName = 'blogDatabase.json') {
    return new Promise((resolve) => {
        fs.readFile(databaseFileName, 'utf8', (err, contents) => {
            if (err) {
                logAndExit(14, "Could not find the " + databaseFileName + " file or permission was not given", err);
            } else {
                if (!contents || contents === '') {
                    logAndExit(15, "Database is empty");
                }
                try {
                    database = JSON.parse(contents);
                } catch (e) {
                    logAndExit(16, "Database is not json or is corrupted", e);
                }
                console.log(typeof database.blogs);
                index = database.blogs.reduce((highest, current,) => {
                    highest += current.id;
                    if (current.id > highest) {
                        highest = current.id
                    }
                    return highest;
                }, 0);
                resolve(true);
            }
        });
    });
}

/**
 * This function will add a increment the index and add it as a param for a blog object as well as return a promise
 * that will try to write to the filesystem updating the database json file at default blogDatabase.json.
 * @param blog  The blog object to insert into database
 * @param databaseFileName A optional database file name default is blogDatabase
 * @returns {Promise} will resolve if the file was written to successful, will reject if not, this may be due to
 * insufficient permissions or missing file,
 */
function writeToDatabase(blog, databaseFileName = 'blogDatabase.json') {
    index++;
    blog.id = index;
    database.blogs.push(blog);
    return new Promise((resolve, reject) => {
        fs.writeFile(databaseFileName, JSON.stringify(database), (e) => {
            if (e) {
                console.error(e);
                reject(e);
            } else {
                resolve();
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


/**
 * A helper function to get a blog in the json structure.
 * @param index the index of the blog
 * @returns {Object}
 */
function getBlogAtIndex(index) {
    let arr = database.blogs;
    return arr.find(blog => {
        if (blog.id === parseInt(index, 10)) return blog;
    });
}

exports.readDatabase = readDatabase;
exports.getBlogAtIndex = getBlogAtIndex;
exports.writeToDatabase = writeToDatabase;
