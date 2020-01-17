// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);

  this.update = function() {
    var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
    newvel.setMag(3);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
  };

  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      //this.r += other.r;
      return true;
    } else {
      return false;
    }
  };

  this.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}


//////////////::
function fucksetup()
{

   function initMap()
   {
       function setCenter(x,y)
       {
           let canvasX = $canvas.width / 2 - x
           let canvasY = $canvas.width / 2 - y
       }
       //context.translate($canvas.width / 2,  $canvas.height/2)
   }

   //initMap()
    //ball.ballUpdate()

    for(let i = 0; i<100; i++)
    {
        let x = (Math.floor(Math.random() * Math.floor($canvas.width)))
        let y = Math.floor(Math.random() * Math.floor($canvas.height))
        /* let x = (Math.random() * ($canvas.width +$canvas.width)) -$canvas.width
        let y = (Math.random() * ($canvas.height +$canvas.height))-$canvas.height */
        ballsBot[i] = new Ball(x,y,16, 'red')
    }
    //context.translate($canvas.width / 2,  $canvas.height/2)
  

    function ballMove()
       {
           window.requestAnimationFrame(ballMove)
           
           ballX += ((mouse.x - ballX)/3) *0.1
           ballY += ((mouse.y - ballY) / 3) *0.1
           //console.log(ballX)
           context.beginPath()
           context.fillStyle = '#fff'
           context.fillRect(0, 0, $canvas.width, $canvas.height)
           context.fill()
           for(let i = 0; i <= ballsBot.length - 1; i++)
           {
               ballsBot[i].drawBall()
           }
           //initGame()
           //if()
           ball = new Ball(ballX,ballY,64, 'black')
           initGame()
           ball.drawBall()
           

       }


       



         
       function initGame()
       {

           window.requestAnimationFrame(initGame)

          function detectCollision(){
           for(var i = 0; i < ballsBot.length; i++){
             var circle1 = {
               radius :ball.r,
               x: window.innerWidth/2+ball.x,
               y: window.innerHeight/2+ball.y
             };
             var circle2 = {
               radius: ballsBot[i].r,
               x:ballsBot[i].x+window.innerWidth/2,
               y: ballsBot[i].y+window.innerHeight/2};
         
             var dx = circle1.x - circle2.x;
             var dy = circle1.y - circle2.y;
             var distance = Math.sqrt(dx * dx * + dy * dy);
             ball.r += ball.r + ballsBot[i].r
             if (distance < circle1.radius + circle2.radius ) {
               console.log(ballsBot[i].r)
               eat = true
               //context.save()
               ballsBot.splice(i, 1)
               
             }
           }
         }
         
        // let eat = false 
       function isEat()
         {
           console.log(eat)
           if(eat == true)
           {
               ball.r = ball.r + 16
           }
         }

       detectCollision()
       isEat()
       }
       
       ballMove()
   
       //initGame()
   
    
}

