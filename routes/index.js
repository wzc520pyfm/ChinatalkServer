const express = require('express');
const router = express.Router();
const connection = require('../mysql/dbConnection');
const config = require('../config/config');


// 创建新用户--注册
router.post('/newUser', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Username, Userpsd} = req.body;
  // 定义sql语句
  const sql = `INSERT INTO user( Username, Userpsd) VALUES("${Username}","${Userpsd}");`;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      if (results.affectedRows === 1) {
        // 插入成功
        res.send(resData);
      } else {
        // 插入失败
        resData.retcode = -1;
        res.send(resData);
      }
    }
  });
});

// 登录
router.post('/Login', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const {Userpsd} = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM user WHERE Userpsd=${Userpsd}`;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});

// 更改用户密码
router.post('/updatePsd', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno, Username, Userpsd } = req.body;
  // 定义sql语句
  const sql = `UPDATE User SET Userpsd="${Userpsd}" WHERE Uno = ${Uno}`;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      console.log(results);
      if (results.changedRows === 1) {
        // 修改成功
        res.send(resData);
      } else {
        // 修改失败
        resData.retcode = -1;
        res.send(resData);
      }
    }
  });
});


// 查询所有单词---单词解释题目---真题测试
router.post('/findAllWords', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { user } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM word `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});

// 查询所有词性选择题---关键字题目----select题
router.post('/findAllSelectQues', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { user } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM select_ques `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});


// 查询复习单词---查询所有的错题
router.post('/findAllCollect', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM collect  `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});

// 查询所有复习单词-----查询所有错题---查询uno为1的,代表1用户做错的
router.post('/findCollect', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM collect where Uno=${Uno} `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});

// 查询所有试卷一
router.post('/findAllExamOne', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM examone `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});

// 查询所有试卷二
router.post('/findAllExamTwo', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM examtwo `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});

// 查询所有试卷三
router.post('/findAllExamThree', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM examthree `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});



// 加入收藏-----加入错题
router.post('/newWord', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Cword, Uno} = req.body;
  // 定义sql语句
  const sql = `INSERT INTO collect( Cword, Uno) VALUES( "${Cword}","${Uno}");`;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      if (results.affectedRows === 1) {
        // 插入成功
        res.send(resData);
      } else {
        // 插入失败
        resData.retcode = -1;
        res.send(resData);
      }
    }
  });
});


// 取消收藏----将错题删除---删除某一个错题
router.post('/cancleCollect', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Cno } = req.body;
  // 定义sql语句
  const sql = `DELETE FROM collect WHERE Cno = ${Cno}`;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      if (results.affectedRows === 1) {
        // 删除成功
        res.send(resData);
      } else {
        // 删除失败
        resData.retcode = -1;
        res.send(resData);
      }
    }
  });
});


// 查询所有看图识物题
router.post('/findGame', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM game_ques `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});

//查询指定看图识物题目的答案--暂不使用
router.post('/findGameAnsw', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { q_id } = req.body;
  // 定义sql语句
  const sql = `SELECT * FROM game_answ where q_id=${q_id} `;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      // 发生错误回传错误提示
      resData.retcode = -1;
      resData.error = err.message;
      res.send(resData);
    } else {
      // 数据返回
      console.log(results);
      resData.obj.list = results;
      res.send(resData);
    }
  });
});


module.exports = router;
