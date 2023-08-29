let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

app.use("/public", express.static(__dirname + "/public"));

app.use("/json", (req, res) => {
  const message = "Hello json";
  const modifiedMessage = process.env['MESSAGE_STYLE'] === 'uppercase' ? message.toUpperCase() : message;
  res.json({ message: modifiedMessage })
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next()
}, (req, res) => {
  res.send({ time: req.time })
})

app.get("/:word/echo", (req, res, next) => {
  res.send({ echo: req.params.word });
  next();
});

app.route('/name').get((req, res, next) => { res.send({ name: `${req.query.first} ${req.query.last}` }); next(); }).post((req, res, next) => { res.json({ name: `${req.body.first} ${req.body.last}` }); next(); });



























module.exports = app;
