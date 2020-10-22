import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
    selector : "[comparePasswordAndConfirmPassword]",
    providers : [
        {
            provide : NG_VALIDATORS,
            useExisting :CompareValidatorDirective,
            multi :true
          }
    ]
})
export class CompareValidatorDirective implements Validator{
    validate(control: AbstractControl): ValidationErrors |null {
        var controlToCompare = control.parent.get('password');
        if(controlToCompare && controlToCompare.value !== control.value)
            return {"comparePasswordAndConfirmPassword" : true}
        else     
            return null;
    }
}