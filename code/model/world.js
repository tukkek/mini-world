import * as rpg from '../control/rpg.js'

const WIDTH=20
const HEIGHT=10
const NEXT=[-1,+1,+0,+0,+0,+1]
const FEATURES=['❓','❓','🏠']

class Cell{
  constructor(point){
    this.point=point
    this.name=''
    this.text=''
    this.neighbors=[]
  }
  
  get x(){return this.point.x}
  
  get y(){return this.point.y}
}

class Point{
  constructor(x=-Number.MAX_VALUE,y=-Number.MAX_VALUE){
    this.x=x
    this.y=y
  }
  
  expand(){
    let expanded=[]
    for(let x=this.x-1;x<=this.x+1;x+=1) for(let y=this.y-1;y<=this.y+1;y+=1){
      if(x==this.x&&y==this.y) continue
      expanded.push(new Point(x,y))
    }
    return expanded
  }
  
  validate(rangex=[0,WIDTH],rangey=[0,HEIGHT]){
    return rangex[0]<=this.x&&this.x<rangex[1]&&
            rangey[0]<=this.y&&this.y<rangey[1]
  }
}

export class World{
  constructor(){
    let w=WIDTH
    let h=HEIGHT
    this.width=w
    this.height=h
    let cells=Array.from(new Array(w),()=>new Array(h))
    this.cells=cells
    for(let x=0;x<w;x+=1) for(let y=0;y<h;y+=1) cells[x][y]=new Cell(new Point(x,y))
    for(let c of cells.flatMap((cells)=>cells))
      c.neighbors=c.point.expand().filter((point)=>point.validate())
                          .map((point)=>cells[point.x][point.y])
    this.border=cells.flatMap((cells)=>cells).filter(c=>c.x==0||c.x==w-1||c.y==0||c.y==h-1)
    this.elevation=['Sea','Marsh','Plain','Hill','Peak']
  }
  
  expand(cella,cellb){
    let e=this.elevation.indexOf(cella.name)
    e+=rpg.pick(NEXT)
    if(e<0) e=0
    else if(e>5-1) e=5-1
    cellb.name=this.elevation[e]
  }
  
  generate(){
    let w=this.width
    let h=this.height
    for(let cell of this.border) cell.name=this.elevation[0]
    // let c=this.cells[rpg.roll(0,w-1)][rpg.roll(0,h-1)]
    // c.name=this.elevation[rpg.mid(1,5)-1]
    let generated=Array.from(this.border)
    while(generated.length<w*h){
      let g=rpg.pick(generated)
      let neighbors=g.neighbors.filter(n=>!n.name)
      let n=neighbors.length>0&&rpg.pick(neighbors)
      if(!n) continue
      this.expand(g,n)
      generated.push(n)
    }
    for(let cell of this.cells.flatMap((cells)=>cells).filter((c)=>c.name!='Sea'))
      if(rpg.chance(6)) cell.text=rpg.pick(FEATURES)
  }
}
