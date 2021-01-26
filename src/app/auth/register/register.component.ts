import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { RegisterModel } from "../../_model/auth.model";
import { AuthService } from "../../_service/auth.service";

@Component({
    selector: "ns-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
    register_form: FormGroup

    constructor(
        private authService: AuthService,
        private router: RouterExtensions,
        private _fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.register_form = this._fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    registerSubmit() {
        let data: RegisterModel = {
            username: this.register_form.get('username').value,
            email: this.register_form.get('email').value,
            password: this.register_form.get('password').value
        };
        this.authService.register(data).subscribe(
            res => this.router.navigate(['/login'])
        );
    }
}
