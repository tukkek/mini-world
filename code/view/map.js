import * as tie from './tie.js'

const VIEW=document.querySelector('#map')

export function draw(cells){
  for(let c of Array.from(VIEW.children).slice(1)) c.remove()
  let width=cells.length
  let height=cells[0].length
  VIEW.style['grid-template-columns']=`repeat(${width},${100/height}vh)`
  for(let y=height-1;y>=0;y-=1) for(let x=0;x<width;x+=1){
    let view=new tie.Clone('#cell').create()
    let r=view.root
    r.style['height']=`${100/height}vh`
    let c=cells[x][y]
    r.innerText=c.text
    let n=c.name
    if(n) r.classList.add(n.toLowerCase())
  }
}
