 var snake = function(environment, ctx) {
     var that = this;

     this.ctx = ctx;
     this.env = environment;
     this.defaultSize = 10;
     this.initialSize = 15;
     this.body_array = [];
     this.locked = false;
     this.direction = 'r';
     this.intervalEngine = undefined;
     this.currentFood = {};

     this.start = function() {
         that.env.clear();

         that.body_array = [];
         that.direction = 'r';
         that.locked = false;

         if (that.intervalEngine != undefined) {
             clearInterval(that.intervalEngine);
         }

         for (var i = 0; i < this.initialSize; i++) {
             this.body_array.push({
                 x: i * this.defaultSize,
                 y: 0 * this.defaultSize,
             });
         }

         that.env.score = 0;
         that.env.updateScore();

         that.intervalEngine = setInterval(function() {
             that.hasEaten();
             that.draw();
             that.move();
             that.checkColision();
         }, 100);

         document.onkeydown = this.checkDirections;

         that.createFood(true);
     }

     this.draw = function() {

         that.env.clear();

         that.createFood(false);

         this.body_array.forEach(function(item) {
             ctx.fillStyle = 'black';
             ctx.fillRect(item.x, item.y, that.defaultSize, that.defaultSize);
             ctx.strokeStyle = 'white';
             ctx.strokeRect(item.x, item.y, that.defaultSize, that.defaultSize);
         });
     }

     this.move = function() {
         var that = this;

         var lastItem = that.body_array[that.body_array.length - 1];

         this.body_array.splice(0, 1);

         if (that.direction == 'd') {
             this.body_array.push({
                 x: lastItem.x,
                 y: lastItem.y + 10
             });
         }

         if (that.direction == 'l') {
             this.body_array.push({
                 x: lastItem.x - 10,
                 y: lastItem.y
             });
         }

         if (that.direction == 'r') {
             this.body_array.push({
                 x: lastItem.x + 10,
                 y: lastItem.y
             });
         }

         if (that.direction == 'u') {
             this.body_array.push({
                 x: lastItem.x,
                 y: lastItem.y - 10
             });
         }

         that.locked = false;
     }

     this.checkDirections = function(e) {
         if (!that.locked) {
             if (e.key == 'ArrowLeft' && that.direction != 'r') {
                 that.direction = 'l'; //left
             }
             if (e.key == 'ArrowUp' && that.direction != 'd') {
                 that.direction = 'u'; //up
             }
             if (e.key == 'ArrowRight' && that.direction != 'l') {
                 that.direction = 'r'; //right
             }
             if (e.key == 'ArrowDown' && that.direction != 'u') {
                 that.direction = 'd'; //down
             }
         }

         that.locked = true;
     }

     this.checkColision = function() {
         var item = that.body_array[that.body_array.length - 1];
         var hasCollided = false;
         for (var i = 0; i < that.body_array.length - 2; i++) {
             if (that.body_array[i].x == item.x && that.body_array[i].y == item.y) {
                 hasCollided = true;
             }
         }

         if (hasCollided) {
             that.start();
             return;
         }

         if (item.x < 0 || item.x > 440 || item.y < 0 || item.y > 440) {
             that.start();
         }
     }

     this.hasEaten = function() {
         var item = that.body_array[that.body_array.length - 1];

         if (item.x == that.currentFood.x && item.y == that.currentFood.y) {
             that.createFood(true);
             that.body_array.push({
                 x: item.x,
                 y: item.y
             });
             that.env.score += 1;
             that.env.updateScore();
         }
     }

     this.createFood = function(newFood) {
         if (that.currentFood.x != undefined) {
             that.ctx.clearRect(that.currentFood.x, that.currentFood.y, that.defaultSize, that.defaultSize);
         }

         if (newFood) {
             that.currentFood.x = Math.floor((Math.random() * (440 - 0 + 1)) / 10) * 10;
             that.currentFood.y = Math.floor((Math.random() * (440 - 0 + 1)) / 10) * 10;
         }

         that.ctx.fillStyle = 'black';
         that.ctx.fillRect(that.currentFood.x, that.currentFood.y, that.defaultSize, that.defaultSize);
         that.ctx.strokeStyle = 'white';
         that.ctx.strokeRect(that.currentFood.x, that.currentFood.y, that.defaultSize, that.defaultSize);
     }
 }
 