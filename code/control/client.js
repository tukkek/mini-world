import * as worldm from '../model/world.js'
import * as names from '../model/names.js'
import * as map from '../view/map.js'

var world=false

export function show(area){map.draw(area.cells)}

export async function setup(){
  await names.setup()
  world=new worldm.World()
  show(world)
  window.addEventListener('keyup',(event)=>{if(event.key=='Escape') show(world)})
}
