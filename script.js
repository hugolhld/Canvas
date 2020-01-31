const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.width = window.innerWidth
$canvas.height = window.innerHeight

 function Ball(x,y,r,c,m, nickname, bot)
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
    this.nickname  = nickname
    this.bot = bot
    this.oldPosition = {x: 0, y: 0}

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
                if(this.m == true)
                {
                    $canvas.addEventListener('mousemove', (event) => 
                    {
                        this.mouse.x = event.clientX
                        this.mouse.y = event.clientY
                    })
                        this.x += ((this.mouse.x - this.x)/3) *0.1
                        this.y += ((this.mouse.y - this.y) / 3) *0.1
                }else
                {
                    if(this.mouse.x + (window.innerWidth / 3) > window.innerWidth || this.mouse.x + (window.innerWidth / 3) < window.innerWidth )
                    {       
                        this.x -= (this.mouse.x - this.oldPosition.x)
                        this.oldPosition.x = this.mouse.x
                    }
                    if(this.mouse.y + (window.innerWidth / 3) > window.innerWidth || this.mouse.y + (window.innerWidth / 3) < window.innerWidth )
                    {       
                        this.y -= (this.mouse.y - this.oldPosition.y)
                        this.oldPosition.y = this.mouse.y
                    }
                }
            this.drawBall()            
        }
        drawCanvas()
    }

    this.ballBotXY = function()
    {

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

        if(this.nickname != undefined)
        {
            context.font = '10px Hellvetica'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillStyle = 'white'
            context.fillText(this.nickname, this.x, this.y)
        }
        
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
            if(this.distance < (this.circle1.radius + this.circle2.radius) - (this.circle2.radius / 2))
            {
                if(this.circle1.radius > this.circle2.radius)
                {
                    this.sum = Math.PI * this.circle1.radius * this.circle1.radius + Math.PI * this.circle2.radius * this.circle2.radius

                    this.r = Math.sqrt(this.sum / Math.PI)
                    return true
                }else {
                    return false
                }
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
let counter = 1
let nicknameDiv  = document.querySelector('.submit').innerHTML
let oldPosition = {x: 0, y: 0}
const playBtn = document.querySelector('.form__play')




window.addEventListener('load', () => 
{
    mainContainer.classList.toggle('test2')
    $canvas.classList.toggle('canvas__paused')
})

playBtn.addEventListener('click', () =>
{
    nicknameDiv  = document.querySelector('.submit').value
    ball.nickname = nicknameDiv
    
    mainContainer.classList.toggle('test2')
    $canvas.classList.toggle('canvas__paused')
})


window.addEventListener('mousemove', (event) =>
{
    mouseMap.x = event.clientX    
    mouseMap.y = event.clientY
})

function setMapFinal()
{
    window.addEventListener('mousemove', (event) =>
    {
        for(const botBall of ballsBot)
        {
            botBall.x += -mouseMap.x + event.clientX
            //console.log(botBall.x)
        }
    })
    
}

function setupGame()
{
    ball = new Ball(window.innerWidth / 2,window.innerHeight  / 2,48,'blue', true, nicknameDiv)
    oldPosition.x = ball.x
    oldPosition.y = ball.y

    for(let i = 0; i < 500; i++)
    {
        let x = Math.floor(Math.random() * Math.floor(5000))
        let y = Math.floor(Math.random() * Math.floor(5000))

        ballsBot[i] = new Ball(x,y, 16, 'red', false)
    }
}

for(let i =0; i < 5; i++)
{
    const botAnimElement = new Ball(Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() * 50,  'green', false)
    botAnim.push(botAnimElement)
}

function setMap()
{   
    if(mouseMap.x + (window.innerWidth / 3) > window.innerWidth)
    {       
        
            for(let i = 0; i < ballsBot.length; i++)
            {
                    ballsBot[i].x = ballsBot[i].x - (mouseMap.x - oldPosition)
                    oldPosition = mouseMap.x
            } 
    }
/*     for(const ballBotSelect of ballsBot)
    {
         if(ball.y > window.innerHeight  - ball.r)
        {
            ballBotSelect.y += (ballBotSelect.y - ball.y) / 2
        }
        if(ball.y < 0  + ball.r)
        {
            ballBotSelect.y += (ballBotSelect.y + ball.y) / 2
        }
        if(ball.x < 0 + ball.r)
        {
            ballBotSelect.x += (ballBotSelect.x + ball.x) / 2
        }
        if(ball.x > window.innerWidth  - ball.r)
        {
            ballBotSelect.x += (ballBotSelect.x - ball.x) / 2
        } 
       
    } */
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
})

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

    function collisionBallBallBotAnim(botAnimColl, index){

        if(botAnimColl[index].collision(botAnimColl[index], ball))
        {
            console.log('game over')
        }

        if(ball.collision(ball, botAnimColl[index]))
        {
            botAnimColl.splice(index, 1)
        }
    }

    for(let i = 0; i < ballsBot.length; i++)
    {

        ballsBot[i].drawBall()
        ballsBot[i].ballUpdate()

    /* if(ball.collision(ball, ballsBot[i], true))
    {
        ballsBot.splice(i, 1)
    } */
    }

   /*  for(let i =  0; i <= botAnim.length - 1; i++)
    {
        for(let j =  0; j <= ballsBot.length - 1; j++)
        {

            if(botAnim[i].collision(botAnim[i], ballsBot[j]))
            {
                //ballsBot.splice(j, 1)

                //console.log('botbotbo')
            }
        }
        //collisionBallBallBotAnim(botAnim, i)
    } */

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


function drawGame()
{
    setupGame()
    //window.requestAnimationFrame(megamagaTest)
    //alert(megamagaTest())
    setCanvasBg()

    //btnPlayPause()
}

drawGame()

/* function megamagaTest()
{
    requestAnimationFrame(setMapFinal)
} */


    

const btnSettings = document.querySelector('.settings__btn')

const menuSettings = document.querySelector('.menu__settings_main')

const pauseBtn = document.querySelector('.test')
const pauseImg = document.querySelector('.test img')
const mainContainer = document.querySelector('.main__container')
const tabPause = ['img/pause.svg', 'img/close.svg']
let indexPause = 0

pauseBtn.addEventListener('click', () =>
{
    mainContainer.classList.toggle('test2')
    $canvas.classList.toggle('canvas__paused')

    indexPause += 1
    
    if(indexPause > 1)
    {
        indexPause = 0
    }

    pauseImg.src = tabPause[indexPause]

    /* if(pauseImg.src == 'img/close.svg')
    {
        pauseImg.src = 'img/pause.svg'
    }
    if(pauseImg.src == 'img/pause.svg')
    {
        pauseImg.src = 'img/close.svg'
    } */
})


btnSettings.addEventListener('click', () =>
{
    //menuSettings.classList.toggle('active')

    menuSettings.classList.toggle('active')
    for(let i = 0; i < menuSettings.children.length ;i++  )
    {
        let selected = menuSettings.children[i]

        if(selected.classList.contains('settings__open'))
        {
            selected.classList.toggle('settings__open')
            selected.classList.toggle('settings__closed')
        }
        if(selected.classList.contains('settings__closed'))
        {
            selected.classList.toggle('settings__open')
            selected.classList.toggle('settings__closed')
        }

        selected.classList.toggle ('animationSettings')
       // console.log(selected.classList)
        selected.addEventListener('animationend', () =>
        {
            //console.log(selected.classList + 'ok')
            i++
        }) 
    }
})