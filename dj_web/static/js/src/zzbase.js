export class DjGame{
    constructor(id,OS) {
        console.log("Create DJGAME");
        this.id = id;
        this.OS = OS;
        this.$dj_game = $('#' + id);
        this.settings = new Settings(this);
        this.menu = new DjGameMenu(this);
        this.playground = new DjGamePlayground(this);

    }//构造函数
}