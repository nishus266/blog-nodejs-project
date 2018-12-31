var db = require('../api.js');

module.exports= app =>{

  app.get('/', function(req,res){
      db.blogapi(req,res);
  });

  app.get('/:id/:name/:bid', function(req,res){

     if(req.params.id=="read"){
       db.readapi(req,res);
     }

  });

  app.get('/:id', function(req,res){

      if(req.params.id=="admin"){
          if(req.session.user){
            res.redirect("/dashboard");
          }
        else{
            res.render("login.pug");
          }
      }

      if(req.params.id=="dashboard"){
        if(req.session.user){
            res.render("dashboard.pug",{
              user: req.session.user.id
            });
          }
        else{
          res.redirect("admin");
        }
          }

      if(req.params.id=="signout"){
            req.session.destroy();
            res.redirect("/");
      }
      if(req.params.id=="test"){
        res.render('main',{
          data: 'hii</br>hii'
        });
      }
  });

  app.post('/admin',function(req, res){
      var m = req.body;
      db.api(m.uname,m.pass,res,req);

  });
  app.post('/post',(req,res) =>{
      var m = req.body;
      db.post(req,res,m);
  });


}
