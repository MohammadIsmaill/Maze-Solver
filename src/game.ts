import {multitree} from "./multitree";


export class Game{
    el:any;
    level:any;
    tileTypes:string[]
    tileDim:number;
    map:any;
    theme:any;
    player:any;
    goal:any;
    type:any;
    tree:multitree;
    id:any;
    
    
    constructor(id:any,level:any){
        this.id = id;
        this.level = level;
        this.el = document.getElementById(id)
        this.tileTypes = ['floor','wall']
        this.tileDim = 32;
        this.map = level.map;
        this.theme = level.theme;
        this.player = {...level.player};
        this.goal = {...level.goal};

    }

    populateMap(){
        this.el.className ='game-container ' + this.theme;
        let tiles = document.getElementById('tiles');

        for(let y = 0 ; y < this.map.length;++y){
            for(let x = 0 ; x < this.map[y].length; ++x){
                let tileCode = this.map[y][x];
                let tileType = this.tileTypes[tileCode];
                let tile = this.createEl(x,y,tileType);
                tiles.appendChild(tile)
            }
        }
    }
    createEl(x:number,y:number,type:string){
            let el = document.createElement('div');
            el.className = type;
            el.style.width = el.style.height = this.tileDim + 'px';
            el.style.left = x*this.tileDim + 'px';
            el.style.top = y *this.tileDim +'px';
            return el;
    }

    placeSprite(type:any){
        let x;
        let y;

        switch(type){
            case "player":
                x = this.player.x;
                y = this.player.y;
                break;
            case "goal":
                x = this.goal.x;
                y = this.goal.y;
                break;
            default: break;

        }
        let sprite = this.createEl(x,y,type);
        sprite.id = type;
        sprite.style.borderRadius = this.tileDim + 'px';

        let layer = this.el.querySelector("#sprites");
        layer.appendChild(sprite);
        return sprite;

    }
    sizeUp(){
        let map = this.el.querySelector('.game-map');
        map.style.height = this.map.length * this.tileDim +'px';
        map.style.width = this.map[0].length * this.tileDim + 'px';
    }

    movePlayer(event:any){
        // event.preventDefault();

        
        switch(event.keyCode){
            case 37:
                this.moveLeft();
                break;
            case 38:
                this.moveUp();
                break;
            case 39:
                this.moveRight();
                break;
            case 40:
                this.moveDown();
                break;
            default:
                
        }
    }

    checkGoal(){
        let body = document.querySelector('body');
        if (this.player.y == this.goal.y && 
            this.player.x == this.goal.x) {
            body.className = 'success';
         }
         else {
            body.className = '';
         }
      
    }
    keyboardListener(){
        document.addEventListener('keydown',event=>{
            this.movePlayer(event);
            this.checkGoal();
        })
    }

    moveLeft(){
        if (this.player.x == 0) {
            return;
        }
       
        let nextTile = this.map[this.player.y][this.player.x - 1];
        if (nextTile == 1) {
            return;
        }
         
        this.player.x -=1;
        
        this.updateHoriz();
    }
    reset(){
        this.player.x = this.level.player.x;
        this.player.y = this.level.player.y
        this.updateHoriz();
        this.updateVert();
    }

    moveUp(){
        if (this.player.y == 0) {
            return;
       }
      
       let nextTile = this.map[this.player.y-1][this.player.x];
       if (nextTile ==1) {
            return;
       }
        
       this.player.y -=1;
       
       this.updateVert();
    }
    moveRight(){
        if (this.player.x == this.map[this.player.y].length - 1) {
            return;
       }
       let nextTile = this.map[this.player.y][this.player.x + 1];
            
       if (nextTile == 1) {
            return;
       }
        
       this.player.x +=1;
       
       this.updateHoriz();
    }

    moveDown(){
        if (this.player.y == this.map.length - 1) {
            return;
       }
       let nextTile = this.map[this.player.y+1][this.player.x];
      
       if (nextTile == 1) {
            return;
       }
        
       this.player.y +=1;
       
       this.updateVert();
    }

    updateHoriz(){
        this.player.el.style.left = this.player.x * this.tileDim+ 'px';    
    }
    updateVert(){
        this.player.el.style.top = this.player.y * this.tileDim+ 'px'; 

    }

    
    
   }
  

