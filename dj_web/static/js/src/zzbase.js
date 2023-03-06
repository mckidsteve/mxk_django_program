class DjGame{
    constructor(id) {
        // console.log("Create DJGAME");
        this.id = id;
        this.$dj_game = $('#' + id);
        this.menu = new DjGameMenu(this);
    }//构造函数
}