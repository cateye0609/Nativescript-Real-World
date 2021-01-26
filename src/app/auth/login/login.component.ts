import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { LoginModel } from "../../_model/auth.model";
import { AuthService } from "../../_service/auth.service";
import * as applicationSettings from '@nativescript/core/application-settings';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    hide_pass = true;
    login_form: FormGroup;

    constructor(
        private authService: AuthService,
        private router: RouterExtensions,
        private _fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.login_form = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    loginSubmit() {
        let data: LoginModel = {
            email: this.login_form.get('email').value,
            password: this.login_form.get('password').value
        };
        this.authService.login(data).subscribe(res => {
            // save token
            applicationSettings.setString('token', res.token);
            // go to home page
            this.router.navigate(['/']);
        });
    }
}
