express = require('express');
let http = require('http');
let Filter = require('bad-words');
let url = require('url');

const db = require('./database');
const date = new Date();
let filter = new Filter();


let app = express();
let server = http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//TODO if database error send back object
content = db.readDatabase()
    .then(() => {
        server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function () {
            var addr = server.address();
            console.log("Server listening at", addr.address + ":" + addr.port);
        });
    });

app.get('/blog', (req, res) => {
    let id = req.query.id;
    let blog = db.getBlogAtIndex(id);
    if (blog) {
        res.write(JSON.stringify(blog));
    } else {
        res.write(JSON.stringify({"error": "not found"}));
    }
    res.end();
});

app.post('/blog', (req, res) => {
    let reqBody = req.body;
    let requiredParams = ['author', 'title', 'description', 'content', 'pictureUrl', 'youtubeUrl'];
    let validate = (obj) => requiredParams.every(field => obj.hasOwnProperty(field));
    //validate length.
    if (validate(reqBody)) {
        reqBody.content = filter.clean(reqBody.content);
        url.parse(reqBody.youtubeUrl);
        reqBody.createAt = date.getTime();
        db.writeToDatabase(reqBody)
            .then(() => {
                res.send({'result': true});
                res.end();
            })
            .catch((err) => {
                console.error(err);
                res.send({'error': 'Could not write to Database'});
                res.end();
            })
    } else {
        res.send({'error': 'all fields must be set'});
        res.end();
    }
});
app.put('/blog', (req, res) => {

});
app.delete('/blog', (req, res) => {
    let index = req.body.id;
    if (!index) {
        res.send({'error': 'No id specified'});
        return;
    }
    db.deleteFromDatabase(index)
        .then(() => {
            res.send({'result': true});
            res.end();
        })
        .catch((e) => {
            console.log('from delete');
            console.log(e);
            res.send({'error': 'unable to update database'})
        })
});
app.get('/blogs', (req, res) => {
});

