import { multitree } from "./multitree";
import {table} from "./table";
import {multinode} from "./multinode";
import { priorityqueue } from "./priorityqueue";

export class searchingTechniques{
    treeAI:multitree;
    found:boolean;
    jDepth:number;

    constructor(){
        this.jDepth = 1000;
    }
    apply(op:string,before:table){
        let level = {
            map:before.map,
            goal:before.goal,
            player:before.player
        }
        
        let after:table = new table(level);
    
       
    
        switch(op){
            case 'UP':
                if(after.player.y == 0) return null;
                
                let tileUP = after.map[after.player.y-1][after.player.x];
                
                if(tileUP == 1) return null;
                
                after.player.y -=1;
                after.action = "UP";
                break;
    
            case 'RIGHT':
    
    
                if (after.player.x == after.map[after.player.y].length - 1)                
                    return null;
    
                
                let tileRIGHT = after.map[after.player.y][after.player.x + 1];
                    
               if (tileRIGHT == 1) 
                    return null;
                after.player.x +=1;
                after.action = "RIGHT";
                break;
            
            case 'LEFT':
                if (after.player.x == 0) {
                    return null;
                }
               
                let tileLEFT = after.map[after.player.y][after.player.x - 1];
                if (tileLEFT == 1) {
                    return null;
                }
                 
                after.player.x -=1;
                after.action = "LEFT";
                break;
    
            case 'DOWN':
                if (after.player.y == after.map.length - 1) {
                    return null;
               }
               let nextTile = after.map[after.player.y+1][after.player.x];
               
               
              
               if (nextTile == 1) {
                    return null;
               }
                
               after.player.y +=1;
               after.action = "DOWN";
            break;
    
        }
        return after;
    }
    IDS(tree:multitree,goal:table){
        let temp = this.jDepth;
        this.treeAI = tree;
        this.found = false;
        for(this.jDepth = 1;this.jDepth<= temp;this.jDepth++){
            this.IDSUtil(this.treeAI.root,goal,0);
        }
    }
    IDSUtil(node:multinode,goal:table,c:number){
        c++;
        if(c > this.jDepth || this.found){
            return;
        }
        let nodeTable:table = node.getData();
    
        if(nodeTable.isEqual(goal)){
            this.treeAI.display_solution(node);
            this.treeAI.solution.push(node);
            this.found = true;
            return;
        }else{
            let tableUP:table = this.apply("UP",nodeTable);
            let tableDOWN:table = this.apply("DOWN",nodeTable);
            let tableLEFT:table =  this.apply("LEFT",nodeTable);
            let tableRIGHT:table = this.apply("RIGHT",nodeTable);
    
            
            
    
            if(tableUP != null){
                this.treeAI.insertNode(tableUP,node.id);
                this.IDSUtil(this.treeAI.search_data(tableUP),goal,c);
            }
            if(tableDOWN != null  ){
                this.treeAI.insertNode(tableDOWN,node.id);
                this.IDSUtil(this.treeAI.search_data(tableDOWN),goal,c);
            }
            if(tableLEFT != null){
                this.treeAI.insertNode(tableLEFT,node.id);
                this.IDSUtil(this.treeAI.search_data(tableLEFT),goal,c);
            }
            
            if(tableRIGHT != null ){
                this.treeAI.insertNode(tableRIGHT,node.id);
                this.IDSUtil(this.treeAI.search_data(tableRIGHT),goal,c);
            }
        }

    }
    BFS(tree:multitree,goal:table){
        let queue:multinode[] = [];
        queue.push(tree.root);
        while(!(queue.length == 0)){
            let node:multinode = queue.shift()
            let nodeTable:table = node.getData();
    
    
            if(nodeTable.isEqual(goal)){
                tree.display_solution(node);
                tree.solution.push(node);
                break;
                
            }
            else{
                let tableUP:table = this.apply("UP",nodeTable);
                let tableDOWN:table = this.apply("DOWN",nodeTable);
                let tableLEFT:table =  this.apply("LEFT",nodeTable);
                let tableRIGHT:table = this.apply("RIGHT",nodeTable);
    
                if(tableUP != null){
                    tree.insertNode(tableUP,node.id);
                    queue.push(tree.search_data(tableUP));
                }
                if(tableDOWN != null){
                    tree.insertNode(tableDOWN,node.id);
                    queue.push(tree.search_data(tableDOWN));
                }
                if(tableLEFT != null){
                    tree.insertNode(tableLEFT,node.id);
                    queue.push(tree.search_data(tableLEFT));
                }
                if(tableRIGHT != null){
                    tree.insertNode(tableRIGHT,node.id);
                    queue.push(tree.search_data(tableRIGHT));
                }
            }
        }
    }

    DFS(tree:multitree,goal:table){
        this.found = false;
        this.treeAI = tree;
        this.DFSUtil(tree.root,goal,0);
    }

    DFSUtil(node:multinode,goal:table,c:number){
        c++;
        if(this.found || c > this.jDepth){
            return;
        }

        let nodeTable:table = node.getData();

        if(nodeTable.isEqual(goal)){
            this.treeAI.display_solution(node);
            this.treeAI.solution.push(node);
            this.found = true;
            return;
        }
        else{

            let tableUP:table = this.apply("UP",nodeTable);
            let tableDOWN:table = this.apply("DOWN",nodeTable);
            let tableLEFT:table =  this.apply("LEFT",nodeTable);
            let tableRIGHT:table = this.apply("RIGHT",nodeTable);
    
    
            if(tableUP != null){
                this.treeAI.insertNode(tableUP,node.id);
                this.DFSUtil(this.treeAI.search_data(tableUP),goal,c);
            }
            if(tableDOWN != null  ){
                this.treeAI.insertNode(tableDOWN,node.id);
                this.DFSUtil(this.treeAI.search_data(tableDOWN),goal,c);
            }
            if(tableLEFT != null){
                this.treeAI.insertNode(tableLEFT,node.id);
                this.DFSUtil(this.treeAI.search_data(tableLEFT),goal,c);
            }
            if(tableRIGHT != null ){
                this.treeAI.insertNode(tableRIGHT,node.id);
                this.DFSUtil(this.treeAI.search_data(tableRIGHT),goal,c);
            }  
        }
    }
    hN(cell1:any,cell2:any){
        return Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y);
    }
    gN(cell1:any,cell2:any){
        if(cell1.x == cell2.x){
            return Math.abs(cell1.y - cell2.y);
        }
        else if(cell1.y == cell2.y){
            return Math.abs(cell1.x - cell2.x);
        }else{
            let x = Math.abs(cell1.x - cell2.x)
            let y = Math.abs(cell1.y - cell2.y);
            if(x > y){
                return x;
            }else{
                return y;
            }
        }

    }
    AStar(tree:multitree, goal:table){
        
        let pq:priorityqueue = new priorityqueue();
        let nnode:multinode = tree.root;


        
        let c = 0 ;
        let t:table = nnode.getData();
        let initialState = t.player;
        let pr = this.hN(t.player,t.goal);


        pq.enqueue(nnode,pr)

        let i  = 0;
        while(!pq.isEmpty()){
            i++;
            let node:multinode = pq.dequeue();
            let t:table = node.getData();

            if(t.isEqual(goal)){
                tree.display_solution(node);
                tree.solution.push(node);
                break;
            }else
            {
                let tableUP:table = this.apply("UP",t);
                let tableDOWN:table = this.apply("DOWN",t);
                let tableLEFT:table =  this.apply("LEFT",t);
                let tableRIGHT:table = this.apply("RIGHT",t);
                if(tableUP != null){
                    let pr = this.gN(initialState,tableUP.player) + this.hN(tableUP.player,tableUP.goal);
                    tree.insertNode(tableUP,node.id);
                    pq.enqueue(tree.search_data(tableUP),pr);
                    
                }
                if(tableDOWN != null  ){
                    let pr = this.gN(initialState,tableDOWN.player) + this.hN(tableDOWN.player,tableDOWN.goal);

                    tree.insertNode(tableDOWN,node.id);
                    pq.enqueue(tree.search_data(tableDOWN),pr);
                }
                if(tableLEFT != null){
                    let pr = this.gN(initialState,tableLEFT.player) + this.hN(tableLEFT.player,tableLEFT.goal);
                    tree.insertNode(tableLEFT,node.id);
                    pq.enqueue(tree.search_data(tableLEFT),pr);
                }
                if(tableRIGHT != null ){
                    let pr = this.gN(initialState,tableRIGHT.player) + this.hN(tableRIGHT.player,tableRIGHT.goal);
                    tree.insertNode(tableRIGHT,node.id);
                    pq.enqueue(tree.search_data(tableRIGHT),pr);
                }  
                
            }
        }

    }
    Bidirectional(tree1:multitree,tree2:multitree){
        // let tree1:multitree = new multitree(goal);
        // let tree2:multitree = tree;
        let queue1:multinode[] = [];
        let queue2:multinode[] = [];
        let arr1:table[] = [];
        let arr2:table[] = [];
        queue1.push(tree1.root);
        queue2.push(tree2.root);
        let i = 0;
        while((!(queue1.length == 0) || !(queue2.length == 0)) && i < 10000){
            i++;
            
            let node1:multinode = queue1.shift();
            let node2:multinode = queue2.shift();
            

            let nodeTable1:table = node1.getData();
            let nodeTable2:table = node2.getData();

            // if(i == 99){
            //     tree1.display_solution(node1);
            //     tree2.display_solution(node2)
            // }

            

            if(tree1.search_data(nodeTable1) && tree2.search_data(nodeTable1)){
                tree1.display_solution(node1);
                tree1.solution.push(node1);

                tree2.display_solution(node1);
                tree2.solution.push(node1);
                break;
            }
            else if(tree1.search_data(nodeTable2) && tree2.search_data(nodeTable2)){
                tree1.display_solution(node2);
                tree1.solution.push(node2);
                tree2.display_solution(node2);
                tree2.solution.push(node2);
            }else{
                let tableUP:table = this.apply("UP",nodeTable1);
                let tableDOWN:table = this.apply("DOWN",nodeTable1);
                let tableLEFT:table =  this.apply("LEFT",nodeTable1);
                let tableRIGHT:table = this.apply("RIGHT",nodeTable1);
    
                if(tableUP != null){
                    tree1.insertNode(tableUP,node1.id);
                    queue1.push(tree1.search_data(tableUP));
                }
                if(tableDOWN != null){
                    tree1.insertNode(tableDOWN,node1.id);
                    queue1.push(tree1.search_data(tableDOWN));
                }
                if(tableLEFT != null){
                    tree1.insertNode(tableLEFT,node1.id);
                    queue1.push(tree1.search_data(tableLEFT));
                }
                if(tableRIGHT != null){
                    tree1.insertNode(tableRIGHT,node1.id);
                    queue1.push(tree1.search_data(tableRIGHT));
                }

                let tableUP2:table = this.apply("UP",nodeTable2);
                let tableDOWN2:table = this.apply("DOWN",nodeTable2);
                let tableLEFT2:table =  this.apply("LEFT",nodeTable2);
                let tableRIGHT2:table = this.apply("RIGHT",nodeTable2);
    
                if(tableUP2 != null){
                    tree2.insertNode(tableUP2,node2.id);
                    queue2.push(tree2.search_data(tableUP2));
                }
                if(tableDOWN2 != null){
                    tree2.insertNode(tableDOWN2,node2.id);
                    queue2.push(tree2.search_data(tableDOWN2));
                }
                if(tableLEFT2 != null){
                    tree2.insertNode(tableLEFT2,node2.id);
                    queue2.push(tree2.search_data(tableLEFT2));
                }
                if(tableRIGHT2 != null){
                    tree2.insertNode(tableRIGHT2,node2.id);
                    queue2.push(tree2.search_data(tableRIGHT2));
                }
            }
        }
        
    }

    


}