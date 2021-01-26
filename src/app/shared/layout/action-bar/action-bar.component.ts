import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../../../_model/user.model";
import { AuthService } from "../../../_service/auth.service";
import { UserService } from '../../../_service/user.service';
import * as applicationSettings from '@nativescript/core/application-settings';

@Component({
    selector: "ns-action-bar",
    templateUrl: "./action-bar.component.html",
    styleUrls: ["./action-bar.component.css"]
})
export class ActionBarComponent implements OnInit {
    is_logged_in: boolean;
    authState_subscription: Subscription;
    user: User;

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {
        this.user = {} as User;
        this.getUser();
        this.getAuthState();
    }

    ngOnInit(): void { }

    getUser() {
        if (applicationSettings.hasKey('username')) {
            this.userService.getUser().subscribe(res => {
                this.user = res;
            });
        }
    }

    // get auth state
    getAuthState() {
        this.authState_subscription = this.authService.logged_in$.subscribe(res => this.is_logged_in = res)
    }

    ngOnDestroy() {
        this.authState_subscription.unsubscribe();
    }
}
