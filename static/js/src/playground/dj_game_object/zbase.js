let DJ_GAME_OBJECTS = []; // 注册表

class DjGameObject{
    constructor(hurtable = false) {
        DJ_GAME_OBJECTS.push(this);

        this.has_called_start = false;
        this.timedelta = 0;
        this.hurtable = hurtable; // 是否可以碰撞
    }

    // only run in first frame
    start(){

    }

    // every frames
    update(){

    }

    // del elem
    destroy(){
        this.on_destroy();

        // 找到该对象并删除
        for(let i = 0;i < DJ_GAME_OBJECTS.length ;++ i){
            if(DJ_GAME_OBJECTS[i] === this){
                DJ_GAME_OBJECTS.splice(i , 1);
                break;
            }
        }
    }

    // 删除前执行
    on_destroy(){

    }
}

let last_timestamp ;

let DJ_GAME_ANIMATION = function (timestamp){
    for(let i = 0;i < DJ_GAME_OBJECTS.length ; ++i){
        let obj = DJ_GAME_OBJECTS[i];
        if(!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        }
        else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }

    }
    last_timestamp = timestamp;
    requestAnimationFrame(DJ_GAME_ANIMATION);

}

requestAnimationFrame(DJ_GAME_ANIMATION);