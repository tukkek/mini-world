import * as dungeon from './dungeon.js'
import * as area from './area.js'
import * as rpg from '../control/rpg.js'

class Figure extends area.Feature{
  constructor(){
    super('⭐')
  }
}

export class Town extends dungeon.Dungeon{
  constructor(tier,terrain){
    super(tier)
    for(let c of this.cells.flatMap((cells)=>cells)) if(!c.style) c.style=terrain
  }
  
  populate(){
    for(let c of this.cells.flatMap((cells)=>cells)) if(c.style){
      let r=rpg.roll(1,6)
      if(r<=3) c.style='Residence'
      else if(r<=5) c.style='Commerce'
      else c.style='Industry'
      if(!rpg.chance(6)) continue
      let f=new Figure()
      if(f.tier>this.tier) f.tier=this.tier
      c.feature=f
    }
  }
  
  generate(){
    super.generate()
    if(rpg.chance(2)) return
    for(let i=0;i<this.tier;i+=1){
      let p=rpg.pick(this.border).point.clone()
      while(p.validate()){
        let c=this.cells[p.x][p.y]
        if(!c.style) c.style='River'
        let delta=rpg.chance(2)?+1:-1
        if(rpg.chance(2)) p.x+=delta
        else p.y+=delta
      }
    }
  }
}
