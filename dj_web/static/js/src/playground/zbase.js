class DjGamePlayground{
    constructor(root) {
        this.root = root;
        this.$playground = $(` 
<div class="dj-game-playground">
  <div class="dj-game-playground-field">
    <div class="dj-game-playground-field-item-back">
      ..Back
    </div>
  </div>
</div>
`);

        this.root.$dj_game.append(this.$playground);
        this.$back = this.$playground.find(`.dj-game-playground-item-back`)
        this.start();
    }

    add_listening_events(){
        let outer = this;
        this.$back.click(function () {
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
        this.hide();
        this.add_listening_events();
    }

    update(){

    }
}