const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const db = require('./app/models/index')

app.use(express.json())
app.use('/user', require('./app/routes/user.route'))
app.use('/comment', require('./app/routes/comment.route'))

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

db.mongoose.connect(db.url, mongooseConfig);

app.listen(PORT, () => console.log("Server running on", PORT))