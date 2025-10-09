import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chemical-manager-FRONT';
}
