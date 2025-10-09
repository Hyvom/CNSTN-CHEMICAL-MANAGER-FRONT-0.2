import { Component } from '@angular/core';

@Component({
  selector: 'app-app-navbar',
  imports: [],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.css'
})
export class AppNavbarComponent {
    isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.toggle('active', this.isMenuOpen);
    }
  }

}
