const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./app/models/index');

app.use(express.json());
app.use(cors());
app.use('/user', require('./app/routes/user.route'));
app.use('/comment', require('./app/routes/comment.route'));

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.mongoose.connect(db.url, mongooseConfig);

app.listen(PORT, '0.0.0.0', () => {
  console.log('dijalankan pada port', PORT);
});
