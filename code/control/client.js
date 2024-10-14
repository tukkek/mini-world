import * as worldm from '../model/world.js'
import * as names from '../model/names.js'
import * as map from '../view/map.js'
import * as rpg from './rpg.js'

const SEED=new URL(document.location).searchParams.get('seed')

var world=false

export function show(area){map.draw(area.cells)}

export async function setup(){
  let l=document.location
  if(!SEED){
    l.href+=`?seed=${new Date().toISOString().replace(/[^0-9]/g, '').slice(0,4+2+2+2+2)}`
    return
  }
  rpg.seed(SEED)
  await names.setup()
  world=new worldm.World()
  show(world)
  window.addEventListener('keyup',(event)=>{if(event.key=='Escape') show(world)})
}
