
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//folders
function makeFolder(folderName){
  return __dirname + folderName
}

server = makeFolder("/server")
views = makeFolder("/html/views")
_public = makeFolder("/html/public")
//folders

//set jade
app.set('view engine', 'jade'); // set templating jade
app.set('views', views); // ruta base de las vistas
app.set('view options', { layout: false }); // layout default activado
//set jade

var controllers = require( server + '/controllers.js' );  // por ahora estan todos los controllers en 1
var routes = require(makeFolder('/routes.js')); // simulacion de route file
routes.set({controllers: controllers})

app.use("/html/public", express.static(path.join(_public))); // armado estatico de contenido en carpeta public

app.get('*', function(req, res){
  routes.makeRoute(req, res) // procesa el request
});

port = 3002; // puerto para escuchar
http.listen(port, function(){
  console.log('Escuchando en *:'+port);
});
