var rng=Math.random

// returns a random integer between two inclusive values
export function roll(min,max){return Math.floor(rng()*(max-min+1))+min}

// returns a random element from an array
export function pick(array){return array[roll(0,array.length-1)]}

// returns the highest of two roll() results
export function high(min,max,m=Math.max){return m(roll(min,max),roll(min,max))}

// returns the mid of three roll() results
export function mid(min,max){return Array.from(new Array(3),()=>roll(min,max)).sort()[1]}

// returns the lowest of two roll() results
export function low(min,max){return high(min,max,Math.min)}

// rolls a number of dice of a number of sides then returns their sum (as in "2D6" notation)
export function dice(dies,sides){return Array.from(new Array(dies),()=>roll(1,sides)).reduce((a,b)=>a+b,0)}

// returns true on "a chance in X" ("a chance in 2" is 50%)
export function chance(n){return n>=1&&roll(1,n)==n}

// shuffles and returns an array or a copy of the array
export function shuffle(array,clone=false){
  if(clone) array=Array.from(array)
  let last=array.length-1
  for(let i=0;i<last;i++){
    let j=roll(i,last)
    let a=array[i]
    let b=array[j]
    array[i]=b
    array[j]=a
  }
  return array
}

// returns true on a percent-based chance (0.00 to 1.00)
export function random(chance){return rng()<chance}

// seed PRNG with a string (see read-me)
export function seed(s){rng=new alea(s)}
