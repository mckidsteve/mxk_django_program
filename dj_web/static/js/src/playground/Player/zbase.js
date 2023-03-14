
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
        console.log(tx , ty);
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

