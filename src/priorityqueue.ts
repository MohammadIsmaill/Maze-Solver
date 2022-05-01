import {multinode} from "./multinode";

class Node{
    element:any;
    priority:number;
    constructor(element:multinode,priority:number){
        this.element = element;
        this.priority = priority;
    }
}

export class priorityqueue{
    arr:Node[];
    constructor(){
        this.arr = [];
    }

    enqueue(element:any,priority:number) : void{
        let node:Node = new Node(element,priority);
        let contain:boolean = false;
        for(let i = 0 ; i < this.arr.length ;i++){
            if(this.arr[i].priority > node.priority){

                this.arr.splice(i,0,node);
                contain = true;
                break;
            }
        }
        if(!contain){
            this.arr.push(node);
        }
    }
    isEmpty():boolean{
        return this.arr.length == 0;
    }
    dequeue() : multinode{
        if(this.isEmpty()){
            return;
        }
        let element = this.arr[0].element;
        this.arr.shift();
         return element;
    }
    display() : void{
        for(let node of this.arr){
            console.log("NODE ELEMENT: " + node.element + " NODE PRIORITY: " + node.priority);
        }
    }

    
}

let pq:priorityqueue = new priorityqueue();
pq.enqueue(3,0);
pq.enqueue(5,0);
pq.enqueue(6,1);
pq.display();

let a = pq.dequeue();
console.log(a);
pq.display();


