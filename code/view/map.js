import * as tie from './tie.js'
import * as client from '../control/client.js'

const VIEW=document.querySelector('#map')

class Details{
  constructor(feature){
    this.feature=feature
    this.view=new tie.Clone('#details').create()
    details=this
  }
  
  show(target){
    let v=this.view
    v.select('.name').innerText=this.feature.name
    target=target.getBoundingClientRect()
    let s=v.root.style
    s['top']=`${target.top}px`
    s['left']=`${target.right}px`
  }
  
  close(){this.view.remove()}
}

var details=false

export function draw(cells){
  if(details) details.close()
  for(let c of Array.from(VIEW.children).slice(1)) c.remove()
  let width=cells.length
  let height=cells[0].length
  VIEW.style['grid-template-columns']=`repeat(${width},${100/height}vh)`
  for(let y=height-1;y>=0;y-=1) for(let x=0;x<width;x+=1){
    let view=new tie.Clone('#cell').create()
    let r=view.root
    r.style['height']=`${100/height}vh`
    let c=cells[x][y]
    let s=c.style
    let classes=r.classList
    if(s) classes.add(s.toLowerCase())
    let f=c.feature
    if(!f) continue
    r.innerText=[f.text,f.tier].join(' ')
    if(!f.name) continue
    r.onmouseenter=(event)=>new Details(f).show(event.target)
    r.onmouseleave=()=>details.close()
    classes.add('expand')
    r.onclick=()=>client.show(f.area)
  }
}
