import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Gif } from 'nativescript-gif';
registerElement('Gif', () => Gif);

@Component({
    selector: 'ns-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}