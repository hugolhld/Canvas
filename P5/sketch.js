// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

var blob;

var blobs = [];
var zoom = 1;

function setup() {
  createCanvas(600, 600);
  blob = new Blob(0, 0, 64);
  for (var i = 0; i < 200; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  function test() {
    amount = 0.1 < 0 ? 0 : 0.1;
    amount = 0.1 > 1 ? 1 : 0.1;
    console.log(zoom + (newzoom - zoom) * amount)
}
test()
  zoom = lerp(zoom, newzoom, 0.1);
  console.log('hello'+ zoom)
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].show();
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
  }



  blob.show();
  blob.update();
}




/////////

function initGame()
{
    const initMap = () =>
   {
       
    //$canvas.style.transform = `translate(${$canvas.width / 10,  $canvas.height/10 })`
       $canvas.style.transform = 'translate(400, 300)'
       $canvas.style.background = 'white'
       console.log($canvas.style)
   }  

   const initBot = () =>
   {
       const spawnBot = () =>
       {

        
            for(let i =  0; i<10; i++)
            {
                context.beginPath()
                context.arc((Math.random() * ($canvas.width +$canvas.width)) -$canvas.width, (Math.random() * ($canvas.height +$canvas.height))-$canvas.height, 50, 0, Math.PI * 2) * 10000
                //context.arc(200, 200, 50, 0, Math.PI * 2) *100000
                context.fillStyle = 'orange'
                context.fill()
            } 
       }
       spawnBot() 
   }
   initBot()
   initMap()
}



const loop = () =>
{
    window.requestAnimationFrame(loop)

    ball.x += ((mouse.x - ball.x)/3) *0.1
    ball.y += ((mouse.y - ball.y) / 3) *0.1
    
    /* context.globalAlpha = 0.2
    context.fillStyle = '#fff'
    context.fillRect(0, 0, $canvas.width, $canvas.height) */

    context.beginPath()
    context.arc(ball.x, ball.y, 50, 0, Math.PI * 2)
    context.fillStyle = 'blue'
    //context.moveTo(ball.x, ball.y)
    /* context.globalAlpha = 1
    context.lineWidth   = 20
    context.lineCap     = 'round'  // round | butt | square
    context.lineJoin    = 'round'  // bevel | round | mitter
    context.strokeStyle = 'orange' */
    context.fill()
    context.beginPath()
        //context.arc((Math.random() * ($canvas.width - $canvas.width)) +$canvas.width, (Math.random() * ($canvas.height - $canvas.height)) +$canvas.height, 50, 0, Math.PI * 2) * 10000
        //context.arc(200, 200, 50, 0, Math.PI * 2) *100000
        context.fillStyle = 'orange'
        context.fill()
        //console.log('ok')
        
}