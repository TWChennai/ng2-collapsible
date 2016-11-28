import { Directive, ElementRef, OnInit, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[collapsible]'
})
export class CollapsibleDirective implements OnInit {
    @Input() default: string;
    @Input() collapsible: boolean;

    public el: HTMLElement;
    public downArrowClassName: string = 'fa-chevron-up';
    public upArrowClassName: string = 'fa-chevron-down';
    public collapsibleControlArrow: string = 'clicked';

    constructor(el: ElementRef, public renderer: Renderer) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
        let isOpen: boolean = this.collapsible || this.collapsible === false ? this.collapsible : (this.default === 'open');
        const icon: Element = this.el.querySelector('.collapsible-control .icon');
        const collapsibleControl = this.el.querySelector('.collapsible-control');
        this.addClass(icon, 'fa');

        this.updateIcon(isOpen, icon);
        this.updateCollapsibleControlArrow(isOpen);

        const content = this.contentToCollapse();
        if (isOpen) {
            this.removeClass(content, 'hidden');
        } else {
            this.addClass(content, 'hidden');
        }

        this.renderer.listen(collapsibleControl, 'click', () => {
            isOpen = !isOpen;
            this.updateIcon(isOpen, icon);
            this.updateCollapsibleControlArrow(isOpen);
            this.toggle(isOpen, this.contentToCollapse());
        });
    }

    public addClass = (element: Element, className: string) => {
        if (element) element.classList.add(className);
    };

    public removeClass = (element: Element, className: string) => {
        if (element) element.classList.remove(className);
    };

    public updateIcon = (isOpen: boolean, icon: Element) => {
        if (isOpen) {
            this.removeClass(icon, this.upArrowClassName);
            this.addClass(icon, this.downArrowClassName);
        } else {
            this.addClass(icon, this.upArrowClassName);
            this.removeClass(icon, this.downArrowClassName);
        }
    };

    public updateCollapsibleControlArrow = (isOpen: boolean) => {
        if (isOpen) {
            this.addClass(this.collapsibleControl(), this.collapsibleControlArrow);
        } else {
            this.removeClass(this.collapsibleControl(), this.collapsibleControlArrow);
        }
    };

    public toggle = (isOpen: boolean, content: Element) => {
        if (isOpen) {
            this.removeClass(content, 'hidden');
        } else {
            this.addClass(content, 'hidden');
        }
    };

    public contentToCollapse = () => {
        return this.el.querySelector('.collapsible-content');
    };

    public collapsibleControl = () => {
        return this.el.querySelector('.collapsible-control');
    };
}
