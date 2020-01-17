const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.width = 800
$canvas.height = 600

/* //Gariniture
context.beginPath()
context.moveTo(200, 200)
context.arc(200, 200, 100,0, Math.PI * 0.3, false) */


/* context.moveTo(200, 200)
context.lineTo(50, 50)
context.lineTo(50, 300) */
//context.closePath()


/* context.fillStyle = '#ff000055'
context.shadowOffsetX = 5
context.shadowOffsetY = 10
context.shadowBlur = 50
context.shadowColor = 'blue' */

/* context.lineWidth = 20
context.lineJoin = 'round'
context.lineCap = 'square'
context.stroke() */

/* context.fillStyle = 'orange'
context.fill()

//la croute
context.beginPath()
context.arc(200, 200, 100, 0, Math.PI * 0.3, false)

context.lineWidth = 12
context.lineCap = 'round'
context.strokeStyle = '#f1bd90'
context.stroke() */

//Faire un trou dans carré
/* context.fillRect(50, 50, 200, 100)
context.clearRect(50, 50, 50, 50) */

/* const text = 'lorem ipsum helloe '

context.fillText(text, 200, 200) */

//const image = document.createElement('img')

//Image
/* const image = new Image() // --> BEaucoup mieux

image.addEventListener('load', () =>{
    context.drawImage(image, 50, 50)
})

image.src = 'https://picsum.photos/400/300'
 */

 //Dessiner courbe de bézier

/* context.beginPath()
context.moveTo(50, 50)
context.bezierCurveTo(
    300,100,
    100,300,
    300, 300
)

context.stroke()

context.beginPath()
context.moveTo(50, 50)
context.quadraticCurveTo(
    300,100,
    300, 300
)

context.stroke() */

//Transparence

/* context.globalAlpha = 0.5
context.fillStyle = '#ff0000'
context.fillRect(50, 50, 200, 200)

context.fillStyle = '#00ff00'
context.fillRect(100, 100, 200, 200)

context.fillStyle = '#0000ff'
context.fillRect(150, 150, 200, 200)

 */

/* context.globalCompositeOperation = 'lighter'

context.fillStyle = '#ff0000'
context.fillRect(50, 50, 200, 200)

context.fillStyle = '#00ff00'
context.fillRect(100, 100, 200, 200)

context.fillStyle = '#0000ff'
context.fillRect(150, 150, 200, 200) */



/* 
context.beginPath()
context.moveTo(200, 200)
context.arc(200, 200, 100,0, Math.PI * 0.3, false) 


 context.moveTo(200, 200)
context.lineTo(50, 50)
context.lineTo(50, 300) 
context.closePath() */


/* const tick = () =>
{
    window.requestAnimationFrame(tick)

    context.clearRect(0, 0, $canvas.width, $canvas.height)

    ball.x += 5
    ball.y = -Math.abs(Math.sin(Date.now()*0.005)) *100 + 200

    if(ball.x > $canvas.width + ball.radius){
        ball.x = -ball.radius
    }

    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    context.fill()
}



tick() */

/* context.fillRect(200, 100, 25, 100)

context.fillStyle = 'grey'
context.fillRect(225, 100, 25, 100)

const ball = {x: 200, y: 200, radius: 10}
const ball2 = {x: 250, y: 200, radius: 10}


context.fillStyle = 'black'
context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
context.arc(ball2.x, ball2.y, ball2.radius, 0, Math.PI * 2)

context.fill()

context.beginPath()
context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2) */

//const ball = {x: 0, y: 0}
const ballBot = {x: 0, y: 0}






/* console.log()

initGame()

loop()
 */
/* const boucle = () =>
{
    window.requestAnimationFrame(boucle)

    context.beginPath()
    context.moveTo(200, 200)
    context.lineTo(50, 300)
    context.lineWidth   = 20
    context.lineCap     = 'round'  // round | butt | square
    context.lineJoin    = 'round'  // bevel | round | mitter
    context.strokeStyle = 'orange'
    context.stroke()
}

boucle()
 */

 function Ball(x,y,r,c,m)
 {
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.m = m
    this.mouse = {x: 0, y: 0}
    //his.ball
   // this.ballsBot = []
    //console.log(this.clientX)
   
    this.ballUpdate = function()
    {

        

        const drawCanvas = () =>
        {
                window.requestAnimationFrame(drawCanvas)

                if(this.m == true)
                {
                    window.addEventListener('mousemove', (event) => 
                    {
                        this.mouse.x = event.clientX
                        this.mouse.y = event.clientY
                    })
                this.x += ((this.mouse.x - this.x)/3) *0.1
                this.y += ((this.mouse.y - this.y) / 3) *0.1
            }
            this.drawBall()            
        }

        drawCanvas()
    }

    this.drawBall = function() 
        {
            context.beginPath()
            context.fillStyle =this.c
            context.arc(this.x, this.y, this.r, 0, Math.PI *2)
            context.fill()
        }

    this.collision = function(ball, ball2)
    {

        this.ball = ball
        this.ball2 = ball2

        this.circle1 = {radius: this.ball.r, x: window.innerWidth/2+this.ball.x, y: window.innerHeight/2+this.ball.y}
        this.circle2 = {radius: this.ball2.r, x: window.innerWidth/2+this.ball2.x, y: window.innerHeight/2+this.ball2.y}
        
        this.dx = this.circle1.x - this.circle2.x
        this.dy = this.circle1.y - this.circle2.y
        
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy)

        if(this.distance < this.circle1.radius + this.circle2.radius)
          {
              this.sum = Math.PI * this.circle1.radius * this.circle1.radius + Math.PI * this.circle2.radius * this.circle2.radius

              this.r = Math.sqrt(this.sum / Math.PI)
              return true
          } else {
              return false
          }
    }

 }


let ball
let ballsBot = []
let zoom =1
let amount = 0.1
let newzoom = 0


function setupGame()
{
    ball = new Ball(0,0,64,'black', true)

    for(let i = 0; i < 100; i++)
    {
        let x = Math.floor(Math.random() * Math.floor($canvas.width))
        let y = Math.floor(Math.random() * Math.floor($canvas.height))
        ballsBot[i] = new Ball(x,y, 16, 'red', false)
    }
}

function setCenter()
{
    cx = ball.x
    cy = ball.y
}

function resizeMap(w,h)
{
    $canvas.width = w
    $canvas.height = h
    window.addEventListener("resize", ()=> {
        resizeMap(window.innerWidth, window.innerHeight)
        //this.initScene()
    });
}

function zoomCalcul()
{
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    zoom = (zoom + (newzoom - zoom) * amount)
}

function setCanvasBg() 
{
    window.requestAnimationFrame(setCanvasBg)

    context.translate(-$canvas.width / 2, -$canvas.height / 2)
    newzoom = 64 / ball.r
    
    //zoomCalcul(zoom, newzoom, amount)
    //console.log(zoomCalcul(9, 8, 0.1))
    //context.scale(2, 2)
    //context.translate(-ball.x, -ball.y)


    context.beginPath()
    context.fillStyle = '#fff'
    context.fillRect(0, 0, $canvas.width, $canvas.height)
    context.fill()


    for(let i =  0; i <= ballsBot.length - 1; i++)
    {
        ballsBot[i].drawBall()
        if(ball.collision(ball, ballsBot[i]))
        {

            ballsBot.splice(i, 1)
        }
    }
    
}


        


function drawGame()
{
    setupGame()
    setCenter()
    resizeMap(window.innerWidth, window.innerHeight)
    setCanvasBg()
    ball.ballUpdate()
    //initBot()
}

drawGame()