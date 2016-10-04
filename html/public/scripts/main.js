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
  canvas.c.width = 1800;
  canvas.c.height = 1800;
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
  spriteBase = document.getElementById("spriteBase");
  spriteArma = document.getElementById("spriteArma");

  function mouseMove(e){
    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
          y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
      };
    }
    coords = getMousePos(canvas.c,e)
    world.mouseX = coords.x
    world.mouseY = coords.y
    world.power = Math.pow(Math.pow((coords.x - base.posX),2)  + Math.pow((base.posY - coords.y),2),0.5)
    world.calculatePower = function(){
      //100 = maxPower
      //1000 = maxDistance
      return world.power * 100 / 1800 ;

    }

  }

  function shoot(){
    arma.insideObjects[arma.insideObjects.length] = makeArrow();
  }
  canvas.c.addEventListener("mousemove", mouseMove);
  canvas.c.addEventListener("mousedown", shoot);


    world = {};
    world.gravity = 9.8 * 15;
    world.air = 0.2;

    base = {}
    base.width = 92;
    base.height = 67;
    base.img = spriteBase;
    base.posX = 0;
    base.posY = canvas.c.height - base.height;
    base.sprites = 1;
    base.spritePos = 1;
    base.draw = function(){
      canvas.ctx.drawImage(base.img,0,0,base.width,base.height,base.posX,base.posY,base.width,base.height)
      // drawRotatedImage(,this.calculePosX(),this.calculePosY(),this.drawAngle);
      arma.draw()
    }
    arma = {}
    arma.width = 118;
    arma.height = 110;
    arma.img = spriteArma;
    arma.posX = base.posX + arma.width/2 - 15
    arma.posY = canvas.c.height - base.height ;
    arma.sprites = 1;
    arma.spritePos = 1;
    arma.insideObjects = [];
    arma.calcularAngulo = function(){
        return (Math.atan2(world.mouseX - base.posX, world.mouseY - base.posY) / TO_RADIANS + 280) *-1
    }
    arma.draw = function(){
      for (var i = 0; i < arma.insideObjects.length; i++) {
        arma.insideObjects[i].draw()
      }
      drawRotatedImage(arma.img,arma.posX,arma.posY,arma.calcularAngulo());
    }

   function makeArrow(){
    this.id = (this.id == undefined) ? 0 : this.id+1;
    arrow = {};
    arrow.name = "Arrow";
    arrow.id = this.id;
    arrow.img  = spriteArrow;
    arrow.initialVelocity = world.calculatePower()
    arrow.width = 91;
    arrow.height = 20;
    arrow.sprites = 1;
    arrow.spritePos = 1;
    arrow.sizeX = 91;
    arrow.sizeY = 20;
    arrow.time = T.get();
    arrow.posX = arma.posX ;
    arrow.posY = arma.height/2 + arrow.height;
    arrow.stockeable = function(){
      if(canvas.c.height-this.posY+this.height > canvas.c.height  ) return true;
      return false;
    };
    arrow.maxTime = arrow.initialVelocity / world.gravity * 2;
    arrow.calculePosX = function(){
      //se clavo?
      if(this.stockeable()) return this.posX;
      //MRUV X + Cos A * VelInicial * T + 1/2 * Ac * T al cuadrado
      this.posX = this.posX + Math.cos(this.angle * TO_RADIANS) * this.initialVelocity * (T.get() - this.time) + 0.5 * world.air * Math.pow((T.get() - this.time),2);
      return this.posX
    };

    arrow.calculePosY = function(){
      //se clavo?
      if(this.stockeable()) return canvas.c.height-this.posY;

      //MRUV X + Cos A * VelInicial * T + 1/2 * Ac * T al cuadrado
      this.posY = this.posY + Math.sin(this.angle * TO_RADIANS) * this.initialVelocity * (T.get() - this.time) - 0.5 * world.gravity * Math.pow((T.get() - this.time),2) ;

      //correcto

      Vy = (this.initialVelocity * Math.sin(this.angle * TO_RADIANS)) - ( world.gravity * (T.get() - this.time));
      Vx = (this.initialVelocity * Math.cos(this.angle * TO_RADIANS)) + ( world.air * (T.get() - this.time));
      Tga = Math.atan(Vy/Vx) / TO_RADIANS;
      this.drawAngle = Tga *-1;

      //lindo

      // this.drawAngle = this.angle *-1 + (T.get() - this.time) * (this.angle/2) / (this.maxTime/2-0.2)


      return canvas.c.height-this.posY
    }
    arrow.angle = (arma.calcularAngulo() + 360) *-1 //Math.floor(Math.random()*(90-45+1)+45);
    arrow.drawAngle = arrow.angle*-1;
    arrow.draw = function(){
      drawRotatedImage(this.img,this.calculePosX(),this.calculePosY(),this.drawAngle);
    }

    return arrow;
  }

  objects = [];
  objects[objects.length] = base;
  //  setInterval(function(){
  //    objects[objects.length] = makeArrow();
  //  },2000)

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
