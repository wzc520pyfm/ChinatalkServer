var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//public目录为静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
//定义的image目录为静态图片资源目录
app.use(express.static(path.join(__dirname, 'image')));
//赋予别名
app.use('/chinatalk/static', express.static(path.join(__dirname, 'public')));

//引用路由
app.use('/chinatalk', indexRouter);

module.exports = app;
