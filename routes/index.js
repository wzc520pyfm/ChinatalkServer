const express = require('express');
const router = express.Router();
const connection = require('../mysql/dbConnection');
const config = require('../config/config');


// 创建新用户--注册--传入Username和Userpsd  正常工作
router.post('/newUser', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Username, Userpsd, Userphone} = req.query;
  // 定义sql语句
  const sql = `INSERT INTO user( Username, Userpsd, Userphone) VALUES("${Username}","${Userpsd}","${Userphone}");`;
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

// 登录---正常工作--传入Username和Userpsd
router.post('/Login', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const {Userpsd} = req.query;
  // 定义sql语句---查表有问题, 不应该直接根据密码查表!!!
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

// 更改用户密码---传入Uno和Userpsd--正常工作
router.post('/updatePsd', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Userphone, Username, Userpsd } = req.query;
  // 定义sql语句
  const sql = `UPDATE User SET Userpsd="${Userpsd}" WHERE Userphone = ${Userphone}`;
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


// 查询所有单词---单词解释题目---真题测试-正常工作
router.post('/findAllWords', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { user } = req.query;
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



// 查询所有词性选择题---关键字题目----select题--正常工作
router.post('/findAllSelectQues', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { user } = req.query;
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

// 新增错题--传入Uno(用户id)和q_id(题目id) --仅限趣味答题--正常工作
router.post('/collect', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno, q_id} = req.query;
  // 定义sql语句
  const sql = `INSERT INTO collect( Uno, q_id) VALUES("${Uno}","${q_id}");`;
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



// 查询特定用户的所有错题id---查询Uno为1的,代表1用户做错的--正常工作
router.post('/findCollect', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.query;
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

//查询特定用户的所有错题详细信息列表
router.post('/findUserCollects', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.query;
  // 定义sql语句
  const sql = `SELECT game_ques.* FROM collect,game_ques where collect.q_id=game_ques.q_id AND Uno=${Uno} `;
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

// 加入收藏-----加入错题----停用
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


// 取消收藏----将错题删除---删除某一个错题--正常工作
router.post('/cancleCollect', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno, q_id } = req.query;
  // 定义sql语句
  const sql = `DELETE FROM collect WHERE Uno = ${Uno} AND q_id = ${q_id}`;
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


// 查询所有看图识物题--正常工作
router.post('/findGame', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { Uno } = req.query;
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

//查询指定的一个看图识物题目--正常工作
router.post('/findOneGame', (req, res, next) => {
  const resData = JSON.parse(JSON.stringify(config.resJson));
  const { q_id } = req.query;
  // 定义sql语句
  const sql = `SELECT * FROM game_ques where q_id=${q_id} `;
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
