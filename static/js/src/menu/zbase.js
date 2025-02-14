class DjGameMenu{
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
}