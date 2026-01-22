import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightFeatured]',
  standalone: true
})
export class HighlightFeaturedDirective implements OnInit {
  @Input() appHighlightFeatured: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlightFeatured) {
      this.el.nativeElement.style.border = '2px solid #FF6B6B';
      this.el.nativeElement.style.backgroundColor = '#FFF5F5';
      this.el.nativeElement.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
    }
  }
}
