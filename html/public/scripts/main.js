console.log("Bartuken's Lab")

//handleResizeFunctions
window.doInResizeFunctions = [];
window.onresize = function(){
  function _doInResizeFunctions(fs){
    for (var i = 0; i < fs.length; i++) { fs[i](); }
  }
  if(doInResizeFunctions.length > 0) _doInResizeFunctions(doInResizeFunctions);
};
//handleResizeFunctions

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

getCanvas =  function() {
  canvas = {}
  canvas.c = document.getElementById("canvas");
  canvas.ctx = canvas.c.getContext("2d");
  canvas.c.width = 800;
  canvas.c.height = 600;
  return canvas
};


function Time(){
  that = this;
  this.time = (this.time == undefined) ? 0 : this.time;
  this.showTimeVar = false;
  this.start = function(){
    that.interval = setInterval(function(){
      that.time=Math.round( (that.time+0.05) * 20 ) / 20 ;
      if(that.showTimeVar) this.setTimerBucket.innerHTML = String(that.time);
    },50);
  }
  this.get = function(){
    return that.time;
  }
  this.showTime = function(){
    _div = document.createElement("DIV")
    _div.setAttribute("id","timer")
    document.getElementById("content").appendChild(_div)
    that.setTimerBucket = document.getElementById("timer");
    that.showTimeVar = true;
  }
  return this;
}

T = Time(); T.start(); T.showTime();



start = function(canvas){
  spriteArrow = document.getElementById("spriteArrow");


   function makeArrow(){
    this.id = (this.id == undefined) ? 0 : this.id+1;
    arrow = {};
    arrow.name = "Arrow";
    arrow.id = this.id;
    arrow.img  = spriteArrow;
    arrow.initialVelocity = Math.floor(Math.random()*(15-8+1)+8);;
    arrow.width = 91;
    arrow.height = 20;
    arrow.sprites = 1;
    arrow.spritePos = 1;
    arrow.sizeX = 91;
    arrow.sizeY = 20;
    arrow.time = T.get();
    arrow.posX = 0;
    arrow.stockeable = false;
    arrow.maxTime = arrow.initialVelocity / 9.8 * 2;
    arrow.maxHeight = Math.pow(arrow.initialVelocity,2) / (2 * 9,8);
    arrow.calculePosX = function(){
      if(canvas.c.height-this.posY+this.height > canvas.c.height && this.stockeable ) return this.posX
      this.posX = this.posX + Math.cos(this.angle * TO_RADIANS) * this.initialVelocity * (T.get() - this.time);
      return this.posX
    };
    arrow.posY = 0;
    arrow.calculePosY = function(){
      if(canvas.c.height-this.posY+this.height > canvas.c.height && this.stockeable) return canvas.c.height-this.posY
      exY = this.posY;
      this.posY = this.posY + Math.sin(this.angle * TO_RADIANS) * this.initialVelocity * (T.get() - this.time) - 0.5 * 9.8 * Math.pow((T.get() - this.time),2) ;
      this.drawAngle = this.angle *-1 + (T.get() - this.time) * (this.angle/2) / (this.maxTime/2-0.2)
      if(this.posY < exY) this.stockeable = true;
      return canvas.c.height-this.posY
    }
    arrow.angle =  Math.floor(Math.random()*(90-45+1)+45);
    arrow.drawAngle = arrow.angle*-1;
    arrow.draw = function(){
      drawRotatedImage(this.img,this.calculePosX(),this.calculePosY(),this.drawAngle);
    }

    return arrow;
  }

  objects = [];

  setInterval(function(){
    objects[objects.length] = makeArrow();
  },500)
  function graphEngine(){
    canvas.ctx.fillStyle = "whitesmoke";
    canvas.ctx.fillRect(0,0,canvas.c.width,canvas.c.height)
    // canvas.ctx.drawImage(spritesKnight,((knight.step-1)*knight.spriteWidth),0,knight.spriteWidth,knight.spriteHeight,(canvas.c.width/2)-(knight.width/2),canvas.c.height-knight.height,knight.width,knight.height)

    // canvas.ctx.drawImage(
    //   spritesAxe, //image
    //   ((axe.step-1)*axe.spriteWidth), //start clipping X
    //   0, //start clipping Y
    //   axe.spriteWidth, //width clipping X
    //   axe.spriteHeight, //height clipping Y
    //   (canvas.c.width/2)-(axe.width/2), //start canvasPos X
    //   canvas.c.height-axe.height, //start canvasPos Y
    //   axe.width, // width in canvas
    //   axe.height // height in canvas
    // )

    for (var i = 0; i < objects.length; i++) {
      objects[i].draw()
    }

    requestAnimationFrame(graphEngine);
  }
  requestAnimationFrame(graphEngine);


  var TO_RADIANS = Math.PI/180;
  function drawRotatedImage(image, x, y, angle){
    // save the current co-ordinate system
    // before we screw with it
    canvas.ctx.save();

    // move to the middle of where we want to draw our image
    canvas.ctx.translate(x, y);

    // rotate around that point, converting our
    // angle from degrees to radians
    canvas.ctx.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image
    canvas.ctx.drawImage(image, -(image.width/2), -(image.height/2));

    // and restore the co-ords to how they were when we began
    canvas.ctx.restore();
  }

}(getCanvas());





















//
