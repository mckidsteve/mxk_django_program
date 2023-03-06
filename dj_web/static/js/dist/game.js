class DjGameMenu{
    constructor(root) {
        this.root = root;
        this.$menu = $(`<div class = "dj-game-menu"></div>`);
        this.root.$dj_game.append(this.$menu);
    }
}class DjGame{
    constructor(id) {
        // console.log("Create DJGAME");
        this.id = id;
        this.$dj_game = $('#' + id);
        this.menu = new DjGameMenu(this);
    }//构造函数
}