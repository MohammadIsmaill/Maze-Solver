
export class multinode{
    data:any
    id:number
    parent:multinode
    children:Array<multinode>
    

    constructor(data:any, id:number,parent:multinode){
        this.id= id;
        this.data = data;
        this.parent = parent;
        this.children = []
    }

    setData(data:any){
        this.data = data;
    }

    getData(){
        return this.data; 
    }
    getParent(){
        return this.parent;
    }
    isEmpty(){
        return this.data == null;
    }
     
    getNode(x:number){
        return x >=0 || 
        x<this.children.length 
        ? this.children[x]:null;
    }

    insertChild(data:any,id:number,parent:multinode){
        
        let p = new multinode(data,id,parent);
        this.children.push(p)
    }
}
