import {multitree} from "./multitree"
import {table} from "./table";
import {multinode} from "./multinode"
import {Game} from "./game";
import {searchingTechniques} from "./searchingTechniques";
let levels:Object[]= [];

levels[0] = {
    map:[
       [1,1,0,0,1],
       [1,0,0,0,0],
       [0,0,1,1,0],
       [0,0,0,1,0],
       [0,1,0,1,0]
    ],
    player: {
       x:0,
       y:4
    },
    goal:{
      x:3,
      y:1
    },
    theme:'default'
  }

  levels[2] = {
    map:[
       [1,0,1,0,0,1,0],
       [0,0,0,0,0,1,0],
       [1,0,1,1,0,0,0],
       [1,0,0,1,0,1,0],
       [1,1,0,0,1,0,0]
    ],
    theme:'dungeon',
    player:{
        x:2,
        y:4
    },
    goal:{
        x:6,
        y:4
    }
   }
   levels[3] = {
    map:[
       [1,0,1,0,0,1,0],
       [0,0,0,0,0,1,0],
       [1,0,1,1,0,0,0],
       [1,0,0,1,0,1,0],
       [1,1,0,0,1,0,0]
    ],
    theme:'dungeon',
    player:{
        x:6,
        y:4
    },
    goal:{
        x:6,
        y:4
    }
   }

levels[1] = {
    map:[
        [1,1,0,0,1],
        [1,0,0,0,0],
        [0,0,1,1,0],
        [0,0,0,1,0],
        [0,1,0,1,0]
     ],
     player: {
        x:3,
        y:1
     },
     goal:{
       x:3,
       y:1
     },
     theme:'default'
}

  



let sq:searchingTechniques = new searchingTechniques();
let myGame:Game;

function start(){
    myGame = new Game('game-container-1',levels[0]);
    
    myGame.populateMap();
    
    myGame.sizeUp();
    
    myGame.placeSprite('goal');
    
    let playerSprite = myGame.placeSprite('player');
    
    myGame.player.el = playerSprite;
    
    myGame.keyboardListener();

}

start();




let table_goal:table = new table(levels[1])
let table_initial:table = new table(levels[0])


let speed = 500;



function moveSprite(path:any,reverse:boolean){
    for(let i = 1 ; i < path.length ;i++){
        setTimeout(()=>{
            let {data} = path[i];
            if(data.action == "UP"){
                if(reverse){
                    myGame.moveDown()
                }
                else{
                    myGame.moveUp();
                }
            }
            if(data.action == "DOWN"){
                if(reverse){
                    myGame.moveUp()
                }
                else{
                myGame.moveDown();

                }
            }
            if(data.action == "LEFT"){
                if(reverse){
                    myGame.moveRight();
                }else{
                    myGame.moveLeft();

                }
            }
            if(data.action == "RIGHT"){
                if(reverse){
                    myGame.moveLeft()
                }else{
                    myGame.moveRight();

                }
            }
            myGame.checkGoal();
        },speed * i);
    }
}


document.querySelector('#BFS').addEventListener('click',(e)=>{
    let tree:multitree = new multitree(table_initial)
    myGame.reset();
    e.preventDefault();
    let time1 = performance.now();
    sq.BFS(tree,table_goal);
    let time2 = performance.now();
    moveSprite(tree.solution,false);
   document.querySelector('#time').innerHTML = `Time taken ${Math.floor(time2 - time1)}ms for BFS`



})
document.querySelector('#DFS').addEventListener('click',(e)=>{
    myGame.reset();
    let tree:multitree = new multitree(table_initial)
    e.preventDefault();
    let time1 = performance.now();
    sq.DFS(tree,table_goal);
    let time2 = performance.now();
    moveSprite(tree.solution,false);
   document.querySelector('#time').innerHTML = `Time taken ${Math.floor(time2 - time1)}ms for DFS`

})
document.querySelector('#IDS').addEventListener('click',(e)=>{
    myGame.reset();
    let tree:multitree = new multitree(table_initial)
    e.preventDefault();
    let time1 = performance.now();
    sq.IDS(tree,table_goal);
    let time2 = performance.now();
    moveSprite(tree.solution,false);
   document.querySelector('#time').innerHTML = `Time taken ${Math.floor(time2 - time1)}ms for IDS`
})

document.querySelector('#ASTAR').addEventListener('click',(e)=>{
    myGame.reset();
    
    let tree:multitree = new multitree(table_initial)
    e.preventDefault();
    let time1 = performance.now();
    sq.AStar(tree,table_goal);
    let time2 = performance.now();
    moveSprite(tree.solution,false);
   document.querySelector('#time').innerHTML = `Time taken ${Math.floor(time2 - time1)}ms for AStar`
})
   

   
// document.querySelector('#BDS').addEventListener('click',(e)=>{
//     let tree1:multitree = new multitree(table_initial)
//     let tree2:multitree = new multitree(table_goal);
//     e.preventDefault();
//     let time1 = performance.now();
//     sq.Bidirectional(tree1,tree2);
//     let time2 = performance.now();
//     moveSprite(tree1.solution,false);
//     // moveSprite(tree2.solution,false);
//    document.querySelector('#time').innerHTML = `Time taken ${Math.floor(time2 - time1)}ms for AStar`
// })
   
