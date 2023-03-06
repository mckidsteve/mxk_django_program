class DjGameMenu{
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class = "dj-game-menu">
<div class="dj-game-menu-field">
<div class ="dj-game-menu-field-item-singlemode">单人模式</div>
<br><br>
<div class="dj-game-menu-field-item-multimode">多人模式</div>
<br><br>
<div class="dj-game-menu-field-item-settings">设置</div>
</div>
</div>
`);
        this.root.$dj_game.append(this.$menu);

        this.$singlemode = this.$menu.find('.dj-game-menu-field-item-singlemode');
        this.$multimode = this.$menu.find(`dj-game-menu-field-item-multimode`);
        this.$settings = this.$menu.find('dj-game-menu-field-item-settings');
        this.start();
    }

    add_listening_events(){
        let outer = this;
        this.$singlemode.click(function (){
            console.log('click single mode');

            outer.hide();
            outer.root.playground = new DjGamePlayground(outer.root);
        });

        this.$multimode.click(function () {
            console.log('click multi mode');
        });

        this.$settings.click(function () {
            console.log('click settigns');
        });
    }

    start(){
        this.add_listening_events();
    }
}