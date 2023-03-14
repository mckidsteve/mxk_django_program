let DJ_GAME_OBJECTS = []; // 注册表

class DjGameObject{
    constructor(hurtable = false) {
        DJ_GAME_OBJECTS.push(this);

        this.has_called_start = false;
        this.timedelta = 0;
        this.hurtable = hurtable; // 是否可以碰撞
    }

    // only run in first frame
    start(){

    }

    // every frames
    update(){

    }

    // del elem
    destroy(){
        this.on_destroy();

        // 找到该对象并删除
        for(let i = 0;i < DJ_GAME_OBJECTS.length ;++ i){
            if(DJ_GAME_OBJECTS[i] === this){
                DJ_GAME_OBJECTS.splice(i , 1);
                break;
            }
        }
    }

    // 删除前执行
    on_destroy(){

    }
}

let last_timestamp ;

let DJ_GAME_ANIMATION = function (timestamp){
    for(let i = 0;i < DJ_GAME_OBJECTS.length ; ++i){
        let obj = DJ_GAME_OBJECTS[i];
        if(!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        }
        else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }

    }
    last_timestamp = timestamp;
    requestAnimationFrame(DJ_GAME_ANIMATION);

}

requestAnimationFrame(DJ_GAME_ANIMATION);class DjGamePlayground{
    constructor(root) {
        this.root = root;

        this.$playground = $(`<div class ="dj-game-playground"></div>`);

        // this.$playground = $(`
// <div class="dj-game-playground">
//   <div class="dj-game-playground-field">
//     <div class="dj-game-playground-field-item-back">
//       ..Back
//     </div>
//   </div>
// </div>
// `);

        this.root.$dj_game.append(this.$playground);

        this.width = this.$playground.width();
        this.height = this.$playground.height();

        this.game_map = new GameMap(this);
        this.players = [];

        this.players.push(new Player(this , this.width/2 , this.height/2 , this.height * 0.05 , "white" ,true ,this.height * 0.15));

        this.$back = this.$playground.find(`.dj-game-playground`)
        this.start();
    }

    add_listening_events(){
        let outer = this;
        this.$back.click(function () {
            console.log("click show");
            outer.hide();
            outer.root.$menu.show();
        });
    }

    show(){
        this.$playground.show();
    }

    hide(){
        this.$playground.hide();
    }

    start(){
        // this.hide();
        this.add_listening_events();
        this.show();
    }

    update(){

    }
}
let get_DIST = function (x1 , y1 ,x2,y2){
    let dx = x1 - x2  , dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
}

class Player extends DjGameObject{
    EPS = 0.1;

    constructor(playground , x , y , radius, color , is_me , speed) {
        super(true);

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.is_me = is_me;
        this.speed = speed;
        this.is_alive = true;

        this.vx = 0;
        this.vy = 0;
        this.move_length = 0;

    }

    add_listening_events(){
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu" , function (){
            return false; // close the right click listener;
        });

        this.playground.game_map.$canvas.mousedown(function (e){
            if(!outer.is_alive) return false;
            let ee = e.which;
            if(ee === 3){
                outer.move_to(e.clientX , e.clientY); // move to (x , y);
            }
        })

    }
    move_to(tx , ty){
        console.log("move_to" , tx , ty);
        this.move_length = get_DIST(this.x , this.y , tx , ty);

        let angle = Math.atan2(ty - this.y , tx - this.x);

        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    start(){
        if(this.is_me) {
            this.add_listening_events();
        }
    }

    update(){
        // console.log(this.x , this.y);
        this.update_move();
        this.render();
    }

    update_move(){
        if(this.move_length < this.EPS){
            this.move_length = 0;
            this.vx = this.vy = 0;
        }
        else {
            let moved = Math.min(this.move_length , this.speed * this.timedelta / 1000);
            // console.log(moved , this.move_length , this.speed , this.timedelta);
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
    }

    on_destroy() {
        this.is_alive = false;
        for(let i = 0 ;i < this.playground.players.length ; ++ i){
            let player = this.playground.players[i];
            if(this === player){
                this.playground.players.splice(i , 1);
        }
        }
    }

}

class GameMap extends DjGameObject{
    constructor(playground) {
        super();

        this.playground =  playground;
        this.$canvas = $(`<canvas style="display: block"></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');

        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;

        this.playground.$playground.append(this.$canvas);
    }


    render(){
        this.ctx.fillStyle = "rgba(0, 0 , 0, 0.2)";
        this.ctx.fillRect(0 ,0 , this.ctx.canvas.width , this.ctx.canvas.height);

    }

    start(){

    }

    update(){
        this.render();
    }

}class DjGameMenu{
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class = "dj-game-menu">
<div class="dj-game-menu-field">
<div class ="dj-game-menu-field-item-singlemode">The solo work</div>
<br><br>
<div class="dj-game-menu-field-item-multimode">The multi work</div>
<br><br>
<div class="dj-game-menu-field-item-settings">The settings</div>
</div>
</div>
`);
        // this.$menu.hide();
        this.root.$dj_game.append(this.$menu);

        this.$singlemode = this.$menu.find('.dj-game-menu-field-item-singlemode');
        this.$multimode = this.$menu.find(`.dj-game-menu-field-item-multimode`);
        this.$settings = this.$menu.find('.dj-game-menu-field-item-settings');
        this.start();
    }

    add_listening_events(){
        let outer = this;
        this.$singlemode.click(function (){
            console.log('click single mode');

            outer.hide();
            outer.root.playground.show();
        });

        this.$multimode.click(function () {
            console.log('click multi mode');
        });

        this.$settings.click(function () {
            console.log('click settings');
        });
    }

    hide(){
        this.$menu.hide();
    }

    show(){
        this.$menu.show();
    }

    start(){
        this.add_listening_events();
    }
}export class DjGame{
    constructor(id) {
        console.log("Create DJGAME");
        this.id = id;
        this.$dj_game = $('#' + id);
        this.menu = new DjGameMenu(this);
        this.playground = new DjGamePlayground(this);

    }//构造函数
}