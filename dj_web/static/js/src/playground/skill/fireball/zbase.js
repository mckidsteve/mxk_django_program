class FireBall extends DjGameObject{
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
