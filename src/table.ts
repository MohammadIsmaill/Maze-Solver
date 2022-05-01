export class table{
    map:any;
    player:any;
    goal:any;
    action:any;
    
    constructor(level:any){
        this.map = level.map;
        this.player = {...level.player};
        this.goal = {...level.goal};
    }
    toString(){
        console.log("TO STRING: " ,this.map)
        let str:String;
        for(let element of this.map){
            for(let j = 0 ; j < element.length ;j++){
                str += element[j] + " ";
            }
            str+="\n";
        }
        return str;
    }
    insertTable(map:any,playerX:number,playerY:number,goalX:number,goalY:number){
        this.map = map;
        this.player.x = playerX;
        this.player.y = playerY;
        this.goal.x = goalX;
        this.goal.y = goalY;
    }
    isEqual(t:table){
        if(t == null) return false;
        if(this.player.y == t.player.y 
            && this.player.x == t.player.x 
            && this.goal.x == t.goal.x 
            && this.goal.y == t.goal.y){
                return true;
        }
        return false;
    }
}










