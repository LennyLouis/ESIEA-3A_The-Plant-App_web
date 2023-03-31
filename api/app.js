var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mqtt = require('mqtt');

const PORT = 9000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mqttCommunicationRouter = require("./routes/mqttCommunication");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/mqttCommunication", mqttCommunicationRouter)

var http = require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const url = 'ws://lennylouis.fr:9001';
const options = {
    clean: true,
    connectionTimeout: 4000,
    username: '1sihuvY7E9zKSY3CYINh',
    password: 'n0sks6LwqTUchlQUdoIfrKNdPSoRRrUC4r60w7rDc'
};

const client = mqtt.connect(url, options);

io.on('connection', socket => {
});

client.on('message', (topic, msg) => {
  try{
    var message = "" + msg;
    io.emit('data', JSON.parse(message.replaceAll("�", "")));
  } catch(error){
    console.error(error);
  }
});

client.on('connect', () => {
  console.log("Connected");
});

client.subscribe('plant');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});

module.exports = app;
