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

        this.vx = 1;
        this.vy = 1;

    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    start(){

    }

    update(){
        this.render();
        this.x += this.vx;
        this.y += this.vy;
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