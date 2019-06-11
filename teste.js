console.log('-1', Boolean(-1))
console.log("0", Boolean(0))
console.log("1", Boolean(1))
console.log("2", Boolean("3"))
console.log("false", Boolean("false"));
console.log("true", Boolean("true"))
console.log("True", Boolean("True"))
console.log("False", Boolean("False"))
console.log("p", Boolean({val: false}))

console.log("multi",Number(true));


class A {
  constructor(){
    this.t = "sda"
  }
  set(toto){
    this._set(toto)
  }
  _set(tat){
    console.log("class a set", tat )
  }
}


class B extends A{
  _set(tat){
    console.log('class b _set', tat);
  }
  
}

const b = new B();

console.log("loris" + b.toString())