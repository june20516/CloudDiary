const express    = require('express');
const postsRouter = require('./routes/posts');
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:8100'}));

// configuration =========================
app.set('port', process.env.PORT || 3000);

app.use('/posts', postsRouter);

app.listen(app.get('port'), () => {
  console.debug('Express server listening on port ' + app.get('port'));
});
