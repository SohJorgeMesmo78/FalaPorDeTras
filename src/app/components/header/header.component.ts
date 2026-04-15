import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() backUrl: string = '/';
  
  get tiktokUrl() { return 'https://www.tiktok.com/@falapordetras'; }
  get instagramUrl() { return 'https://www.instagram.com/falapordetras'; }
}
