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