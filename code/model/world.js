import * as area from './area.js'
import * as names from './names.js'
import * as dungeon from './dungeon.js'
import * as town from './town.js'
import * as rpg from '../control/rpg.js'

class Dungeon extends area.Feature{
  constructor(){
    super('❓')
    this.area=new dungeon.Dungeon(this.tier)
  }
}

class Town extends area.Feature{
  constructor(terrain){
    super('🏠')
    this.language=false
    this.area=new town.Town(this.tier,terrain)
  }
}

export class World extends area.Area{
  expand(cella,cellb){
    let e=this.elevation.indexOf(cella.style)
    e+=rpg.pick(area.next)
    if(e<0) e=0
    else if(e>5-1) e=5-1
    cellb.style=this.elevation[e]
  }
  
  name(){
    let towns=this.features.filter((f)=>f instanceof Town)
    for(let t of towns){
      t.language=rpg.pick(names.all)
      t.name=t.language.noun
    }
    for(let d of this.features.filter((f)=>f instanceof Dungeon)){
      if(towns.length==0){
        d.name=rpg.pick(names.all).noun
        return
      }
      let p=this.find(d).point
      towns.sort((a,b)=>this.find(a).point.distance(p)-this.find(b).point.distance(p))
      d.name=towns[0].language.noun
    }
  }
  
  generate(){
    for(let cell of this.border) cell.style=this.elevation[0]
    let w=this.width
    let h=this.height
    let generated=Array.from(this.border)
    while(generated.length<w*h){
      let g=rpg.pick(generated)
      let neighbors=g.neighbors.filter(n=>!n.style)
      let n=neighbors.length>0&&rpg.pick(neighbors)
      if(!n) continue
      this.expand(g,n)
      generated.push(n)
    }
    for(let cell of this.cells.flatMap((cells)=>cells).filter((c)=>c.style!='Sea'))
      if(rpg.chance(6)) cell.feature=rpg.chance(3)?new Town(cell.style):new Dungeon()
    this.name()
  }
}
