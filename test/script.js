const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

/* $canvas.width = 800
$canvas.height = 600 */

 class World{
    constructor(){
        this.canvas = document.querySelector('.js-canvas')
        this.context = this.canvas.getContext('2d')
        this.width = 3000 //世界寬
        this.height = 3000 //世界高
        this.canvasX = 1500 //一開始的位置X
        this.canvasY = 1500 //一開始的位置Y
        this.bgColor = '#111'
        this.gridColor = '#666'
        this.gridSize = 30 //格子尺寸
    }
    clear(){
        this.canvas.fillStyle = this.bgColor
        this.canvas.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    resize(w,h){
        this.canvas.width = w
        this.canvas.height = h
    }
    setCenter(x,y){
        this.canvasX = this.canvas.width/2 - x
        this.canvasY = this.canvas.height/2 - y
    }
    drawGrid(){
        this.canvas.beginPath();
        for (let i = 0; i <= this.width / this.gridSize; i++) {
            let px = this.canvasX + this.gridSize * i;
            this.canvas.moveTo(px, this.canvasY);
            this.canvas.lineTo(px, this.canvasY+this.height);
        }
        for (let j = 0; j <= this.height / this.gridSize; j++) {
            let py = this.canvasY + this.gridSize * j;
            this.canvas.moveTo(this.canvasX, py);
            this.canvas.lineTo(this.canvasX+this.width, py);
        }
        this.canvas.strokeStyle = this.gridColor;
        this.canvas.stroke();
        this.canvas.closePath();
    }
}


const world = new World()
console.log(world.canvas.width)
world.clear()
class Ball{
    constructor(min,max){
        this.x = min.x+Math.random()*(max.x-min.x)
        this.y = min.y+Math.random()*(max.y-min.y)
        this.color = this.randomBallColor()
        this.radius = 10 //隨機點點的半徑
        this.speed = 0 //隨機點點的速度
    }
    randomBallColor(){
        let color = ['red', 'blue', 'white', 'yellow', 'green']
        return color[Math.floor(Math.random()*color.length)]
    }
    drawOn(world){
        let x = this.x + world.canvasX,
            y = this.y + world.canvasY
        world.context.beginPath()
        //arc(x, y, radius, startAngle, endAngle, anticlockwise)
        world.context.arc(x, y, this.radius, 0, Math.PI * 2, true)
        world.context.fillStyle = this.color
        world.context.fill()
        world.context.closePath()
    }
    offsetTo(Ball){
        return {x:this.x-Ball.x, y:this.y-Ball.y}
    }
    distanceTo(Ball){
        let v = this.offsetTo(Ball)
        return Math.sqrt(v.x*v.x+v.y*v.y)
    }
    eat(Ball){
        this.radius = Math.sqrt(this.radius*this.radius+Ball.radius*Ball.radius)
    }
    limitIn(world){
        this.x = this.x<0?0:this.x>world.width?world.width:this.x
        this.y = this.y<0?0:this.y>world.height?world.height:this.y
    }
}







//////////////
/* function shapedCurve(x) {
    // x between -1 to 1
    var pn = x < 0 ? -1 : 1,
    convex = Math.log10(pn * x) / 2 + 1;
    return Math.abs(x) < 0.01 ? 0 : pn * convex;
  }

const vm = () => {
    
    data(){
        return {
            world: {}, myBall: {}, aiBalls: [], scatterBalls: [],
            minRange: {x:0,y:0}, maxRange: {x:0,y:0}, score: 0,
            drawing: {}, countdown: 90, interval: null, showScore: false, pause: false,
        }
    }
    methods: {
        draw(){
            this.world.clear()
            this.myBall.x+= this.myBall.vector.x
            this.myBall.y+= this.myBall.vector.y
            this.myBall.limitIn(this.world)
            this.world.setCenter(this.myBall.x, this.myBall.y)
            this.world.drawGrid()
            let shouldSort = false
            for (var i = 0; i < this.scatterBalls.length; i++) {
                if (this.scatterBalls[i].distanceTo(this.myBall) < this.myBall.radius) {
                    this.myBall.eat(this.scatterBalls[i])
                    //吃掉幾顆球就加幾顆球進來
                    this.scatterBalls.splice(i, 1);
                    this.scatterBalls.push(new Ball(this.minRange, this.maxRange))
                    continue;
                }
                for (var j = 0; j < this.aiBalls.length; j++) {
                    if(this.scatterBalls[i].distanceTo(this.aiBalls[j]) < this.aiBalls[j].radius) {
                        this.aiBalls[j].eat(this.scatterBalls[i])
                        shouldSort = true
                        this.scatterBalls.splice(i, 1);
                        this.scatterBalls.push(new Ball(this.minRange, this.maxRange))
                        continue;
                    }
                }
                this.scatterBalls[i].drawOn(this.world)
            }
            for (var i = 0; i < this.aiBalls.length; i++) {
                if(this.myBall.distanceTo(this.aiBalls[i]) < Math.max(this.myBall.radius,this.aiBalls[i].radius)){
                    if(this.myBall.radius>this.aiBalls[i].radius){ //玩家吃掉其他AI球
                        this.myBall.eat(this.aiBalls[i])
                        this.aiBalls[i] = new Ball(this.minRange, this.maxRange)
                        this.aiBalls[i].radius = Math.random() * 10 + 20;
                        this.aiBalls[i].speed = 1+Math.random()*3 //玩家吃掉的球會越來越快
                        continue;
                    }else if(this.myBall.radius<this.aiBalls[i].radius&&this.myBall.radius>0){ //玩家被其他AI球吃掉
                        this.aiBalls[i].eat(this.myBall)
                        shouldSort = true
                        this.score = Math.ceil(this.myBall.radius*this.myBall.radius)-225
                        this.endGame()
                        this.myBall.radius = 0
                    }
                }
                //AI球互吃
                for(var j = i; j < this.aiBalls.length; j++){
                    // j球的大小一定大於等於i球
                    var inRadius = this.aiBalls[j].distanceTo(this.aiBalls[i]) < this.aiBalls[j].radius,
                        bigger = this.aiBalls[j].radius>this.aiBalls[i].radius
                    if(inRadius && bigger){
                        this.aiBalls[j].eat(this.aiBalls[i])
                        this.aiBalls[i] = new Ball(this.minRange, this.maxRange)
                        this.aiBalls[i].radius = Math.random() * 10 + 20;
                        this.aiBalls[i].speed = 0.5+Math.random()*3
                        shouldSort = true
                        break;
                    } 
                }
                //移動AI球
                if(this.aiBalls[i].distanceTo(this.myBall)<Math.max(this.world.canvas.width,this.world.canvas.height)){
                    var offset = this.aiBalls[i].offsetTo(this.myBall),
                    pnx = offset.x>0?1:-1,
                    pny = offset.y>0?1:-1,
                    chaseOrEscape = this.aiBalls[i].radius-this.myBall.radius>0?1:-1
                    this.aiBalls[i].x-= this.aiBalls[i].speed*pnx*chaseOrEscape
                    this.aiBalls[i].y-= this.aiBalls[i].speed*pny*chaseOrEscape
                    this.aiBalls[i].limitIn(this.world)
                    // 因為j球的大小一定大於等於i球，大的球一定會覆蓋小的球
                    this.aiBalls[i].drawOn(this.world)
                }
            }
            if(shouldSort){this.aiBalls.sort((a,b)=>a.radius-b.radius)}
            this.myBall.drawOn(this.world)
            this.drawing = requestAnimationFrame(this.draw);
        },
        setCountdown(){
            this.interval = setInterval(()=>{
                this.countdown-=1
                if(this.countdown==0){
                    clearInterval(this.interval)
                    this.interval = null
                    this.endGame()
                }
            },1000)
        },
        startGame(){
            let newBall = new Ball(this.minRange, this.maxRange)
            this.myBall.x = newBall.x
            this.myBall.y = newBall.y
            this.myBall.radius = 15;
            this.showScore = false
            clearInterval(this.interval)
            this.countdown = 90
            this.setCountdown()
        },
        endGame(){
            this.showScore = true
            this.score = Math.ceil(this.myBall.radius*this.myBall.radius)-225
            clearInterval(this.interval)
        },
        initScene(){
            this.world.clear()
            this.world.drawGrid()
            this.myBall.drawOn(this.world)
            this.aiBalls.forEach(function(ball){ball.drawOn(this.world)})
            this.scatterBalls.forEach(function(ball){ball.drawOn(this.world)})
        }
    },
    mounted(){
        this.world = new World(this.$refs.canvas)
        this.world.resize(window.innerWidth, window.innerHeight)
        this.maxRange = {x:this.world.width,y:this.world.height}
        // 玩家
        this.myBall = new Ball(this.minRange, this.maxRange)
        this.myBall.radius = 15
        this.myBall.vector = {x:0,y:0}
        this.myBall.speed = 5 //
        // 散布點點
        for (var k = 0; k < 300; k++) {
            this.scatterBalls.push(new Ball(this.minRange, this.maxRange));
        }
        // 電腦
        for (var k = 0; k < 20; k++) {
            var aiBall = new Ball(this.minRange, this.maxRange)
            aiBall.radius = Math.random() * 10 + 20;
            aiBall.speed = Math.random()*3 //電腦的速度
            this.aiBalls.push(aiBall)
        }
        // event
        let container = this.$refs.agario
        container.addEventListener("mousemove", e=> {
            let rect = container.getBoundingClientRect()
            var vx = (e.clientX-rect.x)/rect.width - 0.5,
                vy = (e.clientY-rect.y)/rect.height - 0.5
            this.myBall.vector.x = this.myBall.speed*shapedCurve(vx)
            this.myBall.vector.y = this.myBall.speed*shapedCurve(vy)
        });
        container.addEventListener("touchmove", e=>{
            let rect = container.getBoundingClientRect()
            var vx = (e.targetTouches[0].pageX-rect.x)/rect.width - 0.5,
                vy = (e.targetTouches[0].pageY-rect.y)/rect.height - 0.5
            this.myBall.vector.x = this.myBall.speed*shapedCurve(vx)
            this.myBall.vector.y = this.myBall.speed*shapedCurve(vy)
        });
        container.addEventListener("mouseover", ()=> {
            if(!this.drawing){
                this.drawing = requestAnimationFrame(this.draw)
            }
            this.pause = false
            if(this.myBall.radius>0&&this.interval==null){
                this.setCountdown()
            }
        });
        container.addEventListener("mouseout", ()=> {
            cancelAnimationFrame(this.drawing);
            this.drawing = null
            clearInterval(this.interval)
            this.interval = null
            this.pause = true
        });
        window.addEventListener("resize", ()=> {
            this.world.resize(window.innerWidth, window.innerHeight)
            this.initScene()
        });
        // 開始遊戲
        this.startGame()
        this.drawing = requestAnimationFrame(this.draw);
    },
    beforeDestroy(){
        cancelAnimationFrame(this.drawing)
    }
} */