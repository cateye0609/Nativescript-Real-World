import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { Label } from '@nativescript/core/ui/label';

@Directive({
    selector: '[maxLines]'
})
export class LabelMaxLinesDirective implements OnInit, OnChanges {
    @Input('maxLines') public maxLines: number = 1;

    public get nativeView(): Label {
        return this.el.nativeElement;
    }

    constructor(private el: ElementRef) { }

    public ngOnInit() {
        const nativeView = this.nativeView;

        if (nativeView instanceof Label) {
            nativeView.on(Label.loadedEvent, () => {
                this.applyMaxLines();
            });
        }
    }

    public ngOnChanges(changes: any) {
        if (changes.maxLines) {
            this.applyMaxLines();
        }
    }

    private applyMaxLines() {
        const nativeView = this.nativeView;

        const maxLines = Math.max(Number(this.maxLines) || 0, 1);

        if (nativeView.android) {
            nativeView.android.setMaxLines(maxLines);
            nativeView.android.setEllipsize(android.text.TextUtils.TruncateAt.END);
        } else if (nativeView.ios) {
            nativeView.ios.numberOfLines = maxLines;
        }
    }
}