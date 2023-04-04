import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule,
    ReactiveFormsModule, HttpClientModule, SwiperModule],
})
export class AppComponent {
  constructor() {}
}
