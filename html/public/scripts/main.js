//Logs tunned
console.slog = function(text){ console.log("[SERVER] "+ text) }
console.clog = function(text){ console.log("[CLIENT] "+ text) }
//Logs tunned

//handleResizeFunctions
window.doInResizeFunctions = [];
window.onresize = function(){
  function _doInResizeFunctions(fs){
    for (var i = 0; i < fs.length; i++) { fs[i](); }
  }
  if(doInResizeFunctions.length > 0) _doInResizeFunctions(doInResizeFunctions);
};

function makeContentGoodAgain() {
  footer = document.getElementById("footer");
  ctn = document.getElementById("content");
  header = document.getElementById("header");
  newCtnHeight = window.innerHeight - (footer.offsetHeight+header.offsetHeight)
  ctn.setAttribute("style","height:"+newCtnHeight+"px");
  if(ctn.offsetHeight+header.offsetHeight > window.innerHeight) {
    footer.setAttribute("class","")
  }else{ footer.setAttribute("class","pushedBot") }
}
makeContentGoodAgain()
doInResizeFunctions[doInResizeFunctions.length] = makeContentGoodAgain
//handleResizeFunctions

var socket = io();
socket.on('/start', function(){
  console.slog("START");
});
