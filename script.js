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

    if(this.c == randomColor)
    {
        this.c = `hsl(${Math.random() * 360}deg, 100%, 90%)`
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
                    /* this.mouse.y = this.mouse.y / 5
                    this.mouse.x = this.mouse.x / 5 */
                    if(this.mouse.x + ($canvas.width / 3) > $canvas.width || this.mouse.x + ($canvas.width / 3) < $canvas.width )
                    {       
                        this.x -= (this.mouse.x - this.oldPosition.x)
                        this.oldPosition.x = this.mouse.x
                    }
                    if(this.mouse.y + ($canvas.width / 3) > $canvas.width || this.mouse.y + ($canvas.width / 3) < $canvas.width )
                    {       
                        this.y -= (this.mouse.y - this.oldPosition.y)
                        this.oldPosition.y = this.mouse.y
                    }
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

        if(this.nickname != undefined || this.m == true)
        {
            context.font = '25px Hellvetica'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillStyle = 'white'
            context.fillText(this.nickname, this.x, this.y)
            context.fillText(Math.round(this.r), this.x, this.y * 1.1)
        }
    }

    this.collision = function(ball, ball2, radius)
    {

        this.ball = ball
        this.ball2 = ball2
        this.radius = radius
        this.radius = false

        this.circle1 = {radius: this.ball.r, x: $canvas.width/2+this.ball.x, y: $canvas.height/2+this.ball.y}
        this.circle2 = {radius: this.ball2.r, x: $canvas.width/2+this.ball2.x, y: $canvas.height/2+this.ball2.y}
        
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
let botAnim = []
let zoom =1
let amount = 0.1
let newzoom = 0
let randomXYR = {x: 0, y:0, r:32}
let randomColor
let mouseMap = {x: 0, y: 0}
let counter = 1
let oldPosition = {x: 0, y: 0}
let nicknameDiv  = document.querySelector('.submit').innerHTML

const playBtn = document.querySelector('.form__play')


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
    ball = new Ball(window.innerWidth / 2,window.innerHeight  / 2,32,'blue', true, nicknameDiv)
    oldPosition.x = ball.x
    oldPosition.y = ball.y

    for(let i = 0; i < 500; i++)
    {
        let x = Math.floor(Math.random() * Math.floor(5000))
        let y = Math.floor(Math.random() * Math.floor(5000))

        ballsBot[i] = new Ball(x,y, 16, randomColor, false, undefined)
    }

    for(let i =0; i < 25; i++)
    {
        const botAnimElement = new Ball(Math.random() * $canvas.width, Math.random() * $canvas.height, Math.random() * 50,  randomColor, false, undefined)
        botAnim.push(botAnimElement)
    }
}



function setMap()
{   
    if(mouseMap.x + ($canvas.width / 3) > $canvas.width)
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

        if(ballSelect.y > $canvas.height *2 - ballSelect.r)
        {
            ballSelect.speedY *= - (1 - friction)
            ballSelect.y = $canvas.height *2  - ballSelect.r
        }

        if(ballSelect.y < ballSelect.r)
        {
            ballSelect.speedY *= - (1 - friction)
            ballSelect.y = ballSelect.r
        }

        if(ballSelect.x > $canvas.width *2 - ballSelect.r)
        {
            ballSelect.speedX *= - (1 - friction)
            ballSelect.x = $canvas.width *2 - ballSelect.r
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
    resizeMap($canvas.width, $canvas.height)
})


const settingsMenu = document.querySelectorAll('.settings__buttons ')
const mainContainerMenu = document.querySelector('.main__container')
let color = '#fafafa'
let colorDark= '#2e2e2e'

const test123 = document.querySelector('.bitch')
console.log(test123)
function darkMode()
{
         document.querySelector('.bitch').addEventListener('mouseover', () =>{
            console.log('hello')
          } )
   
    for(let i = 0; i < settingsMenu.length; i++)
    {
        //test123.push(settingsMenu[i])
      //  console.log(test123)
        test123.addEventListener('mouseover', () =>
        {
        console.log('hello')
        if(i == 0)
        {
            color = '#fafafa'
            colorDark = '#2e2e2e'
            mainContainer.style.color = 'color'
            mainContainer.style.background = 'color2'
            mainContainer.container.border = '1px solid color'
            console.log('0')
        }
        if(i == 1)
        {
            color = '#2E2E2E'
            color2 = '#fafafa'
            mainContainer.style.color = 'color'
            mainContainer.style.background = 'color2'
            mainContainer.container.border = '1px solid color'
            console.log('1')
        }
    })
    
}
    

}



/* function darkMode(button)
{
    context.fill = "#2e2e2e"
} */

/* for( const button of settingsButtons)
{
    console.log(button)
    if(button == 'dark')
    {
        context.fillStyle = '2e2e2e'
    } 
} */

window.requestAnimationFrame(randomDirection)
function setCanvasBg() 
{
    window.requestAnimationFrame(darkMode)
    window.requestAnimationFrame(setCanvasBg)
    context.beginPath()
    context.fillStyle = color
    context.fillRect(0, 0, $canvas.width, $canvas.height)
    context.fill()

    drawGrid()
    ball.ballUpdate()

    function collisionBallBallBotAnim(botAnimColl, index)
    {

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

    if(ball.collision(ball, ballsBot[i], true))
    {
        ballsBot.splice(i, 1)
    }
    }

    for(let i =  0; i <= botAnim.length - 1; i++)
    {
        for(let j =  0; j <= ballsBot.length - 1; j++)
        {

            if(botAnim[i].collision(botAnim[i], ballsBot[j]))
            {
                ballsBot.splice(j, 1)
            }
        }
        //collisionBallBallBotAnim(botAnim, i)
    }

/*     for(let i = 0; i < botAnim.length; i++)
    {
        for(let j = botAnim.length; j > botAnim.length; j--)
        {
            if(botAnim[i].collision(botAnim[i], botAnim[j]))
            {
                if(botAnim[i].r > botAnim[j].r)
                {
                    botAnim.splice(j, 1)
                    console.log("ok")
                }
            }
        }
    }
 */
    /* for(const ball1 of botAnim)
    {

        for(const ball2 of botAnim)
        {
            if(ball1.collision(ball1, ball2))
            {
                if(ball1.r > ball2.r)
                {
                    botAnim.splice(ball2, 1)
                    console.log(botAnim.splice(ball2, 1))
                }
                if(ball2.r < ball1.r)
                {
                    botAnim.splice(ball1, 1)
                }
            }
        }
    } */

    for(let i =  0; i <= botAnim.length - 1; i++)
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
               context.beginPath()
               context.fillStyle = 'orange'
               context.fillRect($canvas.width / 2, $canvas.height / 2, 50, 50)
               context.fill()
               win()
               /* gameoverrr */
            }
        }
    }    

    if(botAnim.length == 0)
    {
        //console.log('++')
        //lose()
    }
    
}


function win()
{
    const  winDiv = document.querySelector('.menu__win')

    console.log('you win')
    winDiv.classList.add('test2')
}

function drawGrid()
{

   const blockWidth = 50
   context.beginPath()
   context.fillStyle = colorDark
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

//drawGame()

/* function megamagaTest()
{
    requestAnimationFrame(setMapFinal)
} */


    

const btnSettings = document.querySelector('.settings__btn')
const btnPlay = document.querySelector('.form__play')
const menuSettings = document.querySelector('.menu__settings_main')

const pauseBtn = document.querySelector('.test')
const pauseImg = document.querySelector('.test img')
const mainContainer = document.querySelector('.main__container')
const menuPause = document.querySelector('.menu__pause')
const tabPause = ['img/pause.svg', 'img/close.svg']
let indexPause = 0

pauseBtn.addEventListener('click', () =>
{
    menuPause.classList.toggle('test2')
    $canvas.classList.toggle('canvas__paused')

    indexPause += 1
    
    if(indexPause > 1)
    {
        indexPause = 0
        drawGame()
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

 let windwoLoadCounter = 0
let setupCounter

window.addEventListener('load', () =>
{
    if(windwoLoadCounter == 0)
    {
        drawGame()
        mainContainer.classList.toggle('test2')
        $canvas.classList.toggle('canvas__paused')
        windwoLoadCounter +=1
    }
})

if(mainContainer.classList.contains('main__container'))
{
    btnPlay.addEventListener('click', () =>
    {
        drawGame()
    })
}else
{

}
/*
 */


/* 
const textWin = 'Vous avez éliminé tout les joueurs, YOU WIN'
const textLose = 'Vous avez été éliminé, soyez plus fort !, YOU LOSE'
const textReplay = 'REJOUER'

context.beginPath()

context.fillStyle = 'black'
context.fillRect(($canvas.width / 2) - 202.5, ($canvas.height / 2 )- 77.5, 405, 155)

context.fillStyle = '#fafafa'
context.fillRect(($canvas.width / 2) - 200, ($canvas.height / 2 )- 75, 400, 150)


context.font = '17px Helvetica'
context.textAlign = 'center'
context.textBaseline = 'middle'
context.fillStyle = 'black'
context.fillText(textWin,($canvas.width / 2) , ($canvas.height / 2)  )

context.fillStyle = '#27ae60'
//context.rotate(45 * Math.PI / 180)
context.arc(($canvas.width / 2) -100, ($canvas.height / 2) + 75, 35, 0.5 * Math.PI, 1.5 *Math.PI, false)
context.arc(($canvas.width / 2) + 100, ($canvas.height / 2) + 75, 35, 1.5 * Math.PI, 0.5 *Math.PI, false)
context.fill()

context.fillStyle = '#fafafa'
context.font = 'bold 20px Helvetica'
context.fillText(textReplay,($canvas.width / 2) , ($canvas.height / 2) + 75 )

//let mouseMap = {x: 0, y:0}

window.addEventListener('mousemove', (e) =>
{
    mouseMap.x += e.clientX 
    mouseMap.y += e.clientY 
    //console.log(mouseMap)

    if(mouseMap.x > ($canvas.width / 2) - 100 && mouseMap.x < ($canvas.width / 2) + 100 && mouseMap.y < ($canvas.height / 2)  + 150 && mouseMap.y > ($canvas.height / 2)  + 75)
    {
        console.log('ok')
    }
})

context.beginPath()
context.fillStyle =  'cyan'
context.fillRect(($canvas.width / 2) - 100, ($canvas.height / 2)  + 75,(($canvas.width / 2) + 100) - (($canvas.width / 2) - 100), (($canvas.height / 2)  + 150) - ($canvas.height / 2)  + 75)
context.fill()





console.log(context.measureText(textWin).width) */


/* Reload !!!!!!!!!!!! function  */

/* window.setTimeout(() => {
    window.location.reload(true);
}, 200); */


/* function hello()
{
    console.log('hghghg')
    requestAnimationFrame(hello)
    setTimeout(hello, 3000)
}

requestAnimationFrame(hello) */

/* si load ne peut afficher le bouton pause */
document.querySelector('.bitch').addEventListener('mouseover', () =>
{
    console.log('bonj')
})