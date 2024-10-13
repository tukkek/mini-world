import * as world from '../model/world.js'
import * as map from '../view/map.js'

export function setup(){
  let w=new world.World()
  w.generate()
  map.draw(w.cells)
}
