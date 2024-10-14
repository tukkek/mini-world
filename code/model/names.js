import * as eloquium from 'https://tukkek.github.io/eloquium/eloquium.js'

export var dragon=false
export var elvish=false
export var humane=false
export var all=[]

function create(countries){
  let l=new eloquium.Language()
  all.push(l)
  for(let c of countries) l.merge(eloquium.countries.get(c))
  return l
}

export async function setup(){
  await eloquium.setup()
  dragon=create(['Japan','China'])
  elvish=create(['US','France'])
  humane=create(['Brazil','Mexico'])
}
