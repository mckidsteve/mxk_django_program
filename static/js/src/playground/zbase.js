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