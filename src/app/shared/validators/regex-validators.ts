import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";

export function hasLowerCase(control: AbstractControl): {[key:string]:boolean} | null{
  if(/[a-z]/.test(control.value)){
    return null
  }
  return{'hasLowerCase':true }
}

export function hasUpperCase(control: AbstractControl): {[key:string]:boolean} | null{
  if(/[A-Z]/.test(control.value)){
    return null
  }
  return{'hasUpperCase':true }
}
export function hasNumber(control: AbstractControl): {[key:string]:boolean} | null{
  if(/[0-9]/.test(control.value)){
    return null
  }
  return{'hasNumber':true }
}
export function hasSpecialCharacters(control: AbstractControl): {[key:string]:boolean} | null{
  if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)){
    return null
  }
  return{'hasSpecialCharacters':true }
}
