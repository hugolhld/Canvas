const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.width = window.innerWidth
$canvas.height = window.innerHeight

 function Ball(x,y,r,c,m,speedX, speedY,botXL)
 {
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.m = m
    this.mouse = {x: 0, y: 0}
    this.speedX = 5
    this.speedY = 5
    this.botXL = true
    //his.ball
   // this.ballsBot = []
    //console.log(this.clientX)

    this.mouseEvent = function()
    {
        window.addEventListener('mousemove', (event) => 
            {
                this.mouse.x = event.clientX
                this.mouse.y = event.clientY
            })
    }

    this.mouseEvent()
   
    this.ballUpdate = function()
    {
        
        const drawCanvas = () =>
        {
            //window.requestAnimationFrame(drawCanvas)
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

    this.botAnimDirection = function(randomXX,randomYY,randomRR)
    {
        const direction = () =>
        {
            window.requestAnimationFrame(direction)

            this.x += randomXX
            this.y += randomYY
            this.r = randomRR

            if(this.x > $canvas.width + this.r){
                this.x = 0
            }

            if(this.y > $canvas.height + this.r){
                this.y = 0
            }

            //console.log(this.x)
            this.drawBall()
        }
        direction()
    }

    this.drawBall = function() 
    {
        context.beginPath()
        context.fillStyle =this.c
        context.arc(this.x, this.y, this.r, 0, Math.PI *2)
        context.fill()
    }

    this.collision = function(ball, ball2, radius)
    {

        this.ball = ball
        this.ball2 = ball2
        this.radius = radius
        this.radius = false

        this.circle1 = {radius: this.ball.r, x: window.innerWidth/2+this.ball.x, y: window.innerHeight/2+this.ball.y}
        this.circle2 = {radius: this.ball2.r, x: window.innerWidth/2+this.ball2.x, y: window.innerHeight/2+this.ball2.y}
        
        this.dx = this.circle1.x - this.circle2.x
        this.dy = this.circle1.y - this.circle2.y
        
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy)

        if(this.radius = true)
        {
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
 }


let ball
let ballsBot = []
let zoom =1
let amount = 0.1
let newzoom = 0
let randomXYR = {x: 0, y:0, r:32}
let botAnim = []
let mouseMap = {x: 0, y: 0}

window.addEventListener('mousemove', (event) =>
{
    mouseMap.x = event.clientX    
    mouseMap.y = event.clientY
    
})

function setupGame()
{
    ball = new Ball(window.innerWidth / 2,window.innerHeight  / 2,64,'blue', true)


    for(let i = 0; i < 1000; i++)
    {
        let x = Math.floor(Math.random() * Math.floor(5000))
        let y = Math.floor(Math.random() * Math.floor(5000))
        ballsBot[i] = new Ball(x,y, 16, 'red', false, true)
    }
}


for(let i =0; i < 5; i++)
{
    const botAnimElement = new Ball(Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() * 50,  'green', false, true)
    botAnim.push(botAnimElement)
}

function setMap()
{   

    for(const ballBotSelect of ballsBot)
    {
        if(ball.y > window.innerHeight  - ball.r)
        {
            ballBotSelect.y = ballBotSelect.y - ball.y
        }
        if(ball.y < 0  + ball.r)
        {
            ballBotSelect.y = ballBotSelect.y + ball.y
        }
        if(ball.x < 0 + ball.r)
        {
            ballBotSelect.x = ballBotSelect.x + ball.x
        }
        if(ball.x > window.innerWidth  - ball.r)
        {
            ballBotSelect.x = ballBotSelect.x - ball.x
        }
    }
}

function randomDirection()
{

    const friction = 0.05

    for(const ballSelect of botAnim)
    {
        
        ballSelect.y += ballSelect.speedY
        ballSelect.x += ballSelect.speedX

        if(ballSelect.y > window.innerHeight - ballSelect.r)
        {
            ballSelect.speedY *= - (1 - friction)
            ballSelect.y = window.innerHeight  - ballSelect.r
        }

        if(ballSelect.y < ballSelect.r)
        {
            ballSelect.speedY *= - (1 - friction)
            ballSelect.y = ballSelect.r
        }

        if(ballSelect.x > window.innerWidth - ballSelect.r)
        {
            ballSelect.speedX *= - (1 - friction)
            ballSelect.x = window.innerWidth - ballSelect.r
        }

        if(ballSelect.x < ballSelect.r)
        {
            ballSelect.speedX *= - (1 - friction)
            ballSelect.x = ballSelect.r
        }
        setMap()
        ballSelect.drawBall()
    }
}

function resizeMap(w,h)
{
    $canvas.width = w
    $canvas.height = h
}

window.addEventListener("resize", ()=> {
    resizeMap(window.innerWidth, window.innerHeight)
    //this.initScene()
});

function setCanvasBg() 
{
    window.requestAnimationFrame(setCanvasBg)
    window.requestAnimationFrame(randomDirection)
    


    context.beginPath()
    context.fillStyle = '#fff'
    context.fillRect(0, 0, $canvas.width, $canvas.height)
    context.fill()

    drawGrid()
    ball.ballUpdate()
    
    for(let i =  0; i <= ballsBot.length - 1; i++)
    {
        ballsBot[i].drawBall()
        ballsBot[i].ballUpdate()
        
        /* if(ball.collision(ball, ballsBot[i], true))
        {
            ballsBot.splice(i, 1)
        } */
    }    
    /* for(let i =  0; i <= botAnim.length - 1; i++)
    {

        for(let j =  0; j <= ballsBot.length - 1; j++)
        {
            //ballsBot[j].drawBall()
            //ballsBot[j].ballUpdate()
            
            if(ball.collision(botAnim[i], ballsBot[j]))
            {
                ballsBot.splice(i, 1)
                //console.log('botbotbo')
            }
        }    
    }   */  

/*     for(let i =  0; i <= botAnim.length - 1; i++)
    {
        //botAnim[i].drawBall()
        //botAnim[i].ballUpdate()

        if(ball.collision(ball, botAnim[i]))
        {

            botAnim.splice(i, 1)
        }
        
    }    
    for(let i =  0; i <= botAnim.length - 1; i++)
    {
        //ballsBot[i].ballUpdate()

        if(botAnim[i].collision(botAnim[i], ball))
        {

            if(botAnim[i].r > ball.r)
            {
                console.log('gameover')
            }

            if(botAnim[i].r < ball.r)
            {
                console.log('++')
            }
        }
        
    }     */
    
}


function drawGrid()
{

    //window.requestAnimationFrame(drawGrid)

   const blockWidth = 50
   context.beginPath()
   context.fillStyle = '#95a5a6'
   context.lineWidth = .5

   for(let i = blockWidth; i < $canvas.height; i += blockWidth)
   {
       context.moveTo(0, i)
       context.lineTo($canvas.width, i)
   }
   for(let j = blockWidth; j < $canvas.width; j += blockWidth)
   {
       context.moveTo(j, 0)
       context.lineTo(j, $canvas.height)
   }

   context.stroke()
}


function drawGame(){
    setupGame()
    setCanvasBg()
}

drawGame()