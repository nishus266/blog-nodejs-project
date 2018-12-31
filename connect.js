var mysql= require('mysql');
var keys= require('./config/keys');
module.exports={
  connects: function(){
    const con = mysql.createConnection({
      host: keys.host,
      user: keys.user,
      password: keys.password,
      database: keys.dbname
   });

   con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   });
   return con;
}

};
