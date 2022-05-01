
import {multinode} from "./multinode";
import { table } from "./table";



export class multitree{
    root:multinode;
    nbnodes:number;
    current:multinode;
    solution:any
    constructor(data:any){
        this.nbnodes = 1;
        this.root = new multinode(data,1,null); 
        this.solution = []
    }
    search_id(id:number){
        this.current = null;
        this.search_idUtil(id,this.root)
        return this.current;
    }
    search_idUtil(id:number, node:multinode){
        if(node == null){
            return;
        }
        if(node.id == id){
            this.current=node;
            return;
        }else{
            for(let child of node.children){
                this.search_idUtil(id,child)
            }
        }
    }
    search_data(data:any){
        this.current = null;
        this.search_dataUtil(data,this.root);
        return this.current;

    }
    search_dataUtil(data:any,node:multinode){
        if(node == null){
            return; 
        }
        let nodeData = node.getData()
        if(nodeData.player.x  == data.player.x && nodeData.player.y == data.player.y){
            this.current = node;
            return;
        }else{
            for(let child of node.children){
                this.search_dataUtil(data,child)
            }
        }
    }
    insertNode(data:any,parentId:number){
        let n = this.search_id(parentId)
        // console.log(n);
        if(n != null){
            n.insertChild(data, ++this.nbnodes,n);
            return true;
        }
        return false;
    }
    display(){
        this.displayUtil(this.root,null)
    }
    displayUtil(node:any,nodep:any){
        if(node != null){
            if(nodep!=null){
                console.log("Node data: " + nodep.getData()+ " Node id: " + node.id + " Node parent: " + node.parent)
            }else{
                console.log("N: " + node.id + ": " + node.getData())
            }

            for(let i = 0 ; i < node.children.length ; i++){
                this.displayUtil(node.getNode(i),node)
            }
        }
    }
    display_solution(node:multinode){
        if(node != null){
            this.display_solution(node.getParent())
            this.solution.push(node.getParent())
            console.log("NODE: ",node.getData())
        }
    }
}


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

let t1:table = new table(levels[0])
let t2:table = new table(levels[0])

let tree:multitree = new multitree(t1);
let tree2:multitree =new multitree(t2)

if(tree2.search_data(t1)){
    console.log("found");
}


