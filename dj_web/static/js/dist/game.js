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

requestAnimationFrame(DJ_GAME_ANIMATION);class FireBall extends DjGameObject{
    EPS = 0.1;
    constructor(playground , player , x , y ,radius , color , damage , vx , vy , speed ,moved_dist) {
        super(true);
        this.playground = playground;
        this.player = player ;
        this.ctx = this.playground.game_map.ctx;

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.damage = damage;

        this.vx = vx;
        this.vy = vy;
        this.speed = speed;
        this.moved_dist = moved_dist;

    }

    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x , this.y , this.radius , 0 , Math.PI*2 , false);
        this.ctx.fillStyle = this.color ;
        this.ctx.fill();
    }

    start(){

    }

    update(){
        this.update_attack();
        this.update_move();
        this.render();
    }

    update_move(){
        if(this.moved_dist < this.EPS){
            this.destroy();
            return false;
        }

        let moved = Math.min(this.moved_dist , this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.moved_dist -= moved;
    }

    is_satisfy_collision(obj){
        if(this === obj) return false;
        if(this.player === obj) return false;
        return IS_COLLISION(this , obj);
    }

    attack(obj){
        // console.log(angle , this.damage , obj.radius);
        obj.is_attacked(this);

        this.destroy();
    }

    update_attack(){
        for(let i = 0 ; i < this.playground.players.length ; ++ i){
            let obj = this.playground.players[i];
            if(this.is_satisfy_collision(obj)){
                this.attack(obj);
                break;
            }
        }
    }

}

let IS_COLLISION = function (obj1, obj2){
    return get_DIST(obj1.x , obj1.y , obj2.x , obj2.y) < obj1.radius + obj2.radius; // 两圆相交
}
class DjGamePlayground{
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

        // the solo work`s enemy
        for(let i = 1;i <= 5; ++ i){
            this.players.push(new Player(this , this.width/2 , this.height / 2 , this.height * 0.05 , GET_RANDOM_COLOR(),false,this.height*0.15));
        }

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

let GET_RANDOM_COLOR = function (){
    let color = "#";
    let HEX = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    for(let i = 0;i < 6 ; i++){
        color += HEX[Math.floor(Math.random() * 16)];
    }
    return color;
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

        this.cur_skill = null;

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
            else if (ee === 1){
                if(outer.cur_skill === "fireball"){
                    outer.shoot_fireball(e.clientX , e.clientY);
                    return false;
                }
                outer.cur_skill = null;
            }
        });

        $(window).keydown(function (e){
            if(!outer.is_alive) return false;
            let ee = e.which;
            if(ee === 81) // Q key
            {
                outer.cur_skill = "fireball";
                return false;
            }
        });

    }

    shoot_fireball(tx , ty){
        // console.log(tx , ty);
        let x = this.x , y = this.y;
        let radius = this.playground.height * 0.01;
        let color = "orange";
        let damage = this.playground.height * 0.01;

        let angle = Math.atan2(ty - this.y , tx - this.x);
        let vx = Math.cos(angle) , vy = Math.sin(angle);
        let speed = this.playground.height*0.5;
        let moved_dist = this.playground.height*1;

        new FireBall(this.playground , this , x , y , radius , color , damage , vx , vy , speed , moved_dist);
    }

    move_to(tx , ty){
        // console.log("move_to" , tx , ty);
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
        this.cold_time = 5;
    }

    update(){
        // console.log(this.x , this.y);
        this.update_AI();
        this.update_move();
        this.render();
    }

    update_AI(){
        if(this.is_me) return false;

        if(this.move_length < this.EPS){
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;

            this.move_to(tx , ty);
        }
        if(!this.update_AI_cold_time()) return false;
        this.update_AI_shoot_fireball();
    }

    update_AI_cold_time(){
        if(this.cold_time > 0){
            this.cold_time -= this.timedelta / 1000;
            return false;
        }
        return true;
    }

    update_AI_shoot_fireball(){
        if(Math.random() < 1 / 300.0){
            let player = this.playground.players[0];
            this.shoot_fireball(player.x , player.y);
        }
    }

    update_move(){
            // console.log(this.speed_damage);
        if(this.speed_damage && this.speed_damage > this.EPS){
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.speed_damage *= this.friction_damage;
            this.x += this.x_damage * this.speed_damage * this.timedelta / 1000 ;
            this.y += this.y_damage * this.speed_damage * this.timedelta / 1000 ;
        }
        else if(this.move_length < this.EPS){
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

    is_attacked(fireball){
        let angle = Math.atan2(this.y - fireball.y , this.x - fireball.x);
        let damage = fireball.damage ;
        this.is_attacked_concrete(angle , damage);
    }
    is_attacked_concrete(angle , damage){
        this.radius -= damage;
        this.friction_damage = 0.8;

        if(this.is_died()) return false;

        this.x_damage = Math.cos(angle);
        this.y_damage = Math.sin(angle);
        this.speed_damage = damage * 500;
    }
    is_died(){
        if(this.radius < this.EPS * 10){
            this.destroy();
            return true;
        }
        return false;
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
        this.ctx.fillStyle = "rgba(0, 0 , 0, 0.1)";
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