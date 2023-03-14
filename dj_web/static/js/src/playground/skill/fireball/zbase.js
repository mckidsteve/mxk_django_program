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

}