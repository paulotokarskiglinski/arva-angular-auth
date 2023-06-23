import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ckp-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.removeNgVersion(this.elementRef.nativeElement);
  }

  removeNgVersion(el: Element | null): void {
    el?.removeAttribute('ng-version');
  }
}
