class Settings{
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        this.start();
    }

    register(){}
    login(){}
    start(){
        this.getinfo();
    }
    hide(){

    }
    show(){

    }
    getinfo(){
        let outer = this;
        $.ajax ({
            url : "/settings/getinfo/",
            type : "GET",
            data:{
                platform : outer.platform,
            },
            success : function (resp){
                console.log(resp);
                if(resp.result === "success"){
                    outer.hide();
                    outer.root.menu.show();
                }
                else{
                    outer.login();
                }
            }
        });
    }
}