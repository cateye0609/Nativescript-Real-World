import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { SettingsModel } from "../../_model/setting.model";
import { User } from "../../_model/user.model";
import { AuthService } from "../../_service/auth.service";
import { UserService } from "../../_service/user.service";

@Component({
    selector: "ns-setting",
    templateUrl: "./setting.component.html",
    styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
    user: User;
    setting_form: FormGroup;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private _fb: FormBuilder
    ) {
        this.user = {} as User;
        this.setting_form = this._fb.group({
            image: ['', [Validators.required, Validators.required]],
            username: ['', [Validators.required, Validators.minLength(1)]],
            bio: [''],
            email: ['', [Validators.required, Validators.email]],
            password: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.user = data['user'];
            this.setting_form.patchValue(this.user);
        });
    }

    // update settings
    settingSubmit() {
        const data: SettingsModel = {
            image: this.setting_form.get('image').value,
            username: this.setting_form.get('username').value,
            bio: this.setting_form.get('bio').value,
            email: this.setting_form.get('email').value,
            new_password: this.setting_form.get('password').value
        };
        this.userService.updateSettings(data).subscribe(
            res => this.router.navigate(['/profile', res.username])
        );
    }

    // logout
    logout() {
        this.authService.logout();
    }
}
