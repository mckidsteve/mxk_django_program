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

}