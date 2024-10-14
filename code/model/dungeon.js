import * as area from './area.js'
import * as rpg from '../control/rpg.js'

class Foe extends area.Feature{
  constructor(){super('❗')}
}

class Boon extends area.Feature{
  constructor(){super('🪙')}
}

export class Dungeon extends area.Area{
  dig(dug,dice=2){
    let cell=rpg.pick(dug)
    let steps=rpg.dice(dice,6)
    for(let i=0;i<steps;i+=1){
      let dig=cell.point.expand(false).filter((p)=>p.validate())
                          .map((p)=>this.cells[p.x][p.y]).filter((c)=>!c.style)
      if(dig.length==0) return
      cell=rpg.pick(dig)
      cell.style=true
      dug.push(cell)
    }
  }
  
  challenge(){
    let delta=[-1,-1,+0,+0,+0,+1]
    let challenge=this.tier-1
    for(let d=rpg.pick(delta);d!=0;d=rpg.pick(delta)) challenge+=d
    return challenge>=1?challenge:1
  }
  
  populate(){
    for(let c of this.cells.flatMap((cells)=>cells)){
      if(!c.style){
        c.style='Dark'
        continue
      }
      c.style='Room'
      let r=rpg.roll(1,6)
      let feature=false
      if(r==1) feature=new Foe()
      else if(r==6) feature=new Boon()
      if(!feature) continue
      feature.tier=this.challenge()
      c.feature=feature
    }
  }
  
  generate(){
    // for(let c of this.cells.flatMap((cells)=>cells)) c.style='Dark'
    let access=[this.width,this.height].map((w)=>Math.floor(w/2))
    access=this.cells[access[0]][access[1]]
    access.style=true
    let dug=[access]
    for(let i=0;i<this.tier;i+=1) this.dig(dug)
    this.populate()
  }
}
