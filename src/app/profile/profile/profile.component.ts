import { Component, OnChanges, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Article } from "../../_model/article.model";
import { Profile } from "../../_model/profile.model";
import { UserService } from "../../_service/user.service";
import * as applicationSettings from '@nativescript/core/application-settings';
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "ns-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
    profile: Profile;
    current_username: string = applicationSettings.getString('username');
    my_articles: Article[];
    follow_text: string = "Follow";

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private router: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.profile = {} as Profile;
        this.activatedRoute.data.subscribe(data => {
            this.profile = data['profile'];
            this.updateFollowText();
        });
    }

    updateFollowText() {
        if (this.profile.following) {
            this.follow_text = "Unfollow";
        } else this.follow_text = "Follow";
    }

    followClicked(username: string, followed: boolean) {
        if (followed) {
            this.userService.unfollowUser(username).subscribe(
                res => this.profile.following = false
            );
        } else {
            this.userService.followUser(username).subscribe(
                res => this.profile.following = true
            );
        }
    }

    postTypeTabChange(index: number) {
        this.router.navigate(['/profile/' + this.profile.username + (index === 0 ? '' : '/favorites')]);
    }

}
