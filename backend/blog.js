express = require('express');
let http = require('http');
let Filter = require('bad-words');
let url = require('url');

const db = require('./database');
const date = new Date();
let filter = new Filter();

const requiredParams = ['author', 'title', 'description', 'content', 'pictureUrl', 'youtubeUrl'];


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
    if (id) {
        res.send({'error': 'must send id in query'});
        res.end();
        return;
    }
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
    let validate = (obj) => requiredParams.every(field => obj.hasOwnProperty(field));
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
    let id = req.query.id;
    if (!id) {
        res.send({'error': 'must send id in query'});
        res.end();
        return;
    }
    let updateBlogFields = req.body;
    Object.keys(updateBlogFields).forEach(key => {
        if (!requiredParams.includes(key)) delete updateBlogFields[key];
    });
    console.log(updateBlogFields);

    //test by sending para that is is not in requireParams


    let blog = db.getBlogAtIndex(id);
    if (blog) {
        //Object.assign(target , sources) sources properties will overwrite target properties
        let updateBlog = Object.assign(blog, updateBlogFields);
        console.log('udpated blog');
        console.log(updateBlog);
        db.updateBlog(id, updateBlog)
            .then(() => res.send('one sec'))
            .catch((err) => {
                console.error(err);
                res.send({'error': 'Could not write to Database'});
            });


        //update blog in db
        //then send response
    } else {
        res.write(JSON.stringify({"error": "not found"}));
    }
    res.end();
    //ensure only fields that are allowed to be updated are left after stripping ones that arnt
    // then use assign to copy the new values the write to db.


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
    res.send(db.getBlogs());
    res.end();

});

