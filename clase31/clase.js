const suma = (...nums) => {
  if(nums.length === 0) return 0
  let validInput = true;
  for(let i = 0; i < nums.length && validInput; i++) {
    if(typeof nums[i] !== 'number') {
      validInput = false
    }
  }
  if(!validInput) return null;
  let result = 0;
  for (let i=0; i<nums.length; i++) {
    result += nums[i]
  }
  return result

}

let testPasados = 0
let testsTotales = 4

let resultTest4 = suma(1,2,3,4,5,6,7,8)
if(resultTest4 === 15254 ) {
  console.log('Espectacular!')
  testPasados++
} else {
  console.log(`Test no pasado, se recibio ${resultTest4}, pero se esperaba 15`)
}