import {Component} from '@angular/core';
import {HomeComponent} from './page/home/home.component';
import {provideHttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {

}
