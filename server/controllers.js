
module.exports = {
  index: function(res){
    console.log("[Server] Leyendo controllers.index");
    res.render('index', { test: "start debug" }, function(err, html) {  //contenido principal
        res.render('layout', { html: html }); //leyout donde poner el contenido principal, el CP esta en la variable html
    });
  }
};