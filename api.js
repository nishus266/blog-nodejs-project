const mysql = require('mysql');
const conn= require('./connect');

module.exports = {
    api: function(a,b,res,req){
          const  con=conn.connects();
          var sql="SELECT * FROM user where uname="+ mysql.escape(a);
          con.query(sql,function(err, result, fields){
          if (err) throw err;
          if(result[0].pass==b){
          req.session.user={id:a};
          console.log(req.session.user);
          res.cookie('user',a).redirect('/dashboard');
          }
          else {
            res.redirect('/admin');
          }
     });

    },
    blogapi: function(req,res){
      const  con=conn.connects();
      var sql="SELECT * FROM blog";
      con.query(sql,function(err, result, fields){
      if (err) throw err;
      m=result;
      console.log(result);
      res.render('index.pug',{ blog: m
        });
      });

    },

    readapi: function(req,res){
      const  con=conn.connects();
      var sql="SELECT * FROM blog where id="+req.params.bid;
      con.query(sql,function(err, result, fields){
      if (err) throw err;
       var m=result;
      console.log(result);
       res.render('article',{ data: m[0]
       });
         });
    },

    post: function(req,res,m){
      const  con=conn.connects();
      var sql="SELECT max(id) as counter from blog;";
      con.query(sql,function(err, result, fields){
      if (err) throw err;
       var counter = result[0].counter+1;
       var sql="INSERT INTO blog (id, title, ilink, article, blike) VALUES ?";
       var value = [
            [counter, m.title, '/blogimg/1.jpg' , m.article, 0 ]
       ];
       con.query(sql, [value],function(err, result, fields){
       if (err) throw err;
       res.redirect('/dashboard');
       });
    });


    }
};
