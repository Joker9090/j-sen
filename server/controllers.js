
module.exports = {
  index: function(res){
    console.log("[Server] Leyendo controllers.index");
    res.render('index', { test: "start debug" }, function(err, html) {  //contenido principal
        console.log("[Server] Devolviendo vista index con layout");
        res.render('layout', { html: html }); //leyout donde poner el contenido principal, el CP esta en la variable html
    });
  }
};
