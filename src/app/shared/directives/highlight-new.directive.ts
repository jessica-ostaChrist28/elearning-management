import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightNew]',
  standalone: true
})
export class HighlightNewDirective implements OnInit {
  @Input() appHighlightNew: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlightNew) {
      this.el.nativeElement.style.position = 'relative';

      const badge = document.createElement('span');
      badge.textContent = 'NEW';
      badge.style.position = 'absolute';
      badge.style.top = '-8px';
      badge.style.right = '-8px';
      badge.style.backgroundColor = '#4CAF50';
      badge.style.color = 'white';
      badge.style.padding = '4px 8px';
      badge.style.borderRadius = '4px';
      badge.style.fontSize = '10px';
      badge.style.fontWeight = 'bold';

      this.el.nativeElement.appendChild(badge);
    }
  }
}
