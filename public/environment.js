 var environment = function(canvas, context) {
     this.canvas = canvas;
     this.ctx = context;
     this.w = $('#canvas').width();
     this.h = $('#canvas').height();
     this.score = 0;

     this.init = function() {
         this.ctx.fillStyle = "white";
         this.ctx.fillRect(0, 0, this.w, this.h);
         this.ctx.strokeStyle = "black";
         this.ctx.strokeRect(0, 0, this.w, this.h);
     }

     this.clear = function() {
         this.ctx.clearRect(0, 0, canvas.width, canvas.height);
         this.ctx.fillStyle = "white";
         this.ctx.fillRect(0, 0, this.w, this.h);
         this.ctx.strokeStyle = "black";
         this.ctx.strokeRect(0, 0, this.w, this.h);
     }
     
     this.updateScore = function(){
         $('#score').text(this.score);
     }
 }
 