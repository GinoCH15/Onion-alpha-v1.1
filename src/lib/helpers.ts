
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
}

export function reduceArrayToTwo(arr: Array<Object>){
  
  if(arr.length > 2){
    arr.splice(2, arr.length-2)
    return arr;
  }
  return arr;
}