const fs = require('fs');
express = require('express');
let http = require('http');
let Filter = require('bad-words');
let url = require('url');

let filter = new Filter();
let database = {};

let app = express();
let server = http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

content = readDatabase()
    .then(result => {
        database = result;
        server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function () {
            var addr =  server.address();
            console.log("Server listening at", addr.address + ":" + addr.port);
        });
    });

app.get('/blog', (req, res) => {
    let id = req.query.id;
    console.log(id);
    let blog = getBlogAtIndex(id);
    if (blog) {
        res.write(JSON.stringify(blog));
    } else {
        res.write(JSON.stringify({"error": "not found"}));
    }
    res.end();
});

app.post('/blog', (req, res) => {
    //validate data
    //ensure all needed fields are there
    //
    let reqBody = req.body;
    console.log(typeof reqBody);
    let requiredParams = ['author', 'title', 'description', 'content', 'pictureUrl', 'youtubeUrl'];
    let validate = (obj) => requiredParams.every(field => obj.hasOwnProperty(field));
    //validate length.

    if (validate(reqBody)) {

        reqBody.content = filter.clean(reqBody.content);
        url.parse(reqBody.youtubeUrl);
        database.blogs.res.send({'result': true})
    } else {
        res.send({'error': 'all fields must be set'});
    }
    res.end();
});
app.put('/blog', (req, res) => {
});
app.delete('/blog', (req, res) => {
});
app.get('/bogs', (req,res) => {
});

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

/**
 * Reads a content from a json file where the database data resides.
 * The path given is a relative path to this file.
 * The databaseFile para is not need to try and stay true to functional programming.
 * Will fail if insufficient permission and or file does not exits.
 * @param databaseFileName optional database file name
 * @returns {Promise<Object>} returns the parse database json file.
 */
async function readDatabase(databaseFileName = 'blogDatabase.json') {
    return new Promise((resolve) => {
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



