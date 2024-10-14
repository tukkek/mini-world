import * as rpg from '../control/rpg.js'

const WIDTH=20
const HEIGHT=10

export class Feature{
  constructor(text){
    this.text=text
    this.area=false
    this.tier=rpg.low(1,5)
  }
}

class Cell{
  constructor(point){
    this.point=point
    this.style=''
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
  
  expand(diagonal=true){
    let expanded=[]
    for(let x=-1;x<=+1;x+=1) for(let y=-1;y<=+1;y+=1){
      if(x==0&&y==0) continue
      if(!diagonal&&x!=0&&y!=0) continue 
      expanded.push(new Point(this.x+x,this.y+y))
    }
    return expanded
  }
  
  validate(rangex=[0,WIDTH],rangey=[0,HEIGHT]){
    return rangex[0]<=this.x&&this.x<rangex[1]&&
            rangey[0]<=this.y&&this.y<rangey[1]
  }
  
  distance(point){
    let x=Math.abs(point.x-this.x)
    let y=Math.abs(point.y-this.y)
    return Math.sqrt(x*x+y*y)
  }
  
  clone(){return new Point(this.x,this.y)}
}

export class Area{
  constructor(tier=0){
    this.tier=tier
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
    this.generate()
  }
  
  generate(){throw 'Unimplemented.'}
  
  get features(){return this.cells.flatMap((cells)=>cells).map((c)=>c.feature).filter((c)=>c)}
  
  find(feature){return this.cells.flatMap((cells)=>cells).find((c)=>c.feature==feature)}
}

export var next=[-1,+1,+0,+0,+0,+1]
