var controllers;
module.exports = {
  set: function(o){
    controllers = o.controllers; // seteo del objeto controller
  },
  makeRoute: function(req, res){
    console.log("[Server] Armando ruta " + req.method + " " + req.originalUrl)
    switch (req.originalUrl) {
      case "/":
      switch (req.method) {
        case "GET": controllers.index(res);
        break;
        case "POST":

        break;
        default:
      }
      break;

      default:
      console.log("[Server] No encontro " + req.originalUrl )
      res.status(404).send('Not found');
    }

  }
};
