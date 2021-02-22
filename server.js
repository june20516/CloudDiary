// import required essentials
const http = require('http');
const express = require('express');
var cors = require('cors');
// import `posts` from `routes` folder 
const postsRouter = require('./routes/posts');

// create new app
const app = express();
app.use(express.json());
// use it before all route definitions
// allowing below URL to access these APIs end-points
// you can replace this URL(http://localhost:8100) with your
// application URL from where you are calling these APIs
app.use(cors({origin: 'http://localhost:8100'}));

/* this '/posts' URL will have two end-points:
→ localhost:3000/posts/ (this returns array of objects)
→ localhost:3000/posts/:id (this returns single object)
*/
app.use('/posts', postsRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('node-ex-api works :-)');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
