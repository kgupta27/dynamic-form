import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import SwiperCore, { Pagination, Keyboard } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/angular';
import { SwiperModule } from 'swiper/angular';
// import 'swiper/swiper-bundle.css';

SwiperCore.use([Pagination, Keyboard]);
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, SwiperModule],
})
export class FormPage implements OnInit {

  // @ViewChild(IonicSlides) slides: IonicSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  form!: FormGroup;
  pages: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.http.get('assets/form-data.json').subscribe((data: any) => {
      this.pages = data.pages;

      this.form = this.formBuilder.group({});

      this.pages.forEach((page: any) => {
        page.controls.forEach((control: any) => {
          const validators = [];
          if (control.validation) {
            if (control.validation === 'email') {
              validators.push(Validators.email);
            } else if (control.validation === 'password') {
              validators.push(Validators.minLength(6));
            }
          }
          this.form.addControl(control.id, this.formBuilder.control('', validators));
          console.log(this.form)
          console.log(this.pages)
        });
      });
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  getControlOffset(control: any) {
    const position = control.position.split('.');
    const col = position[1];
    return `--ion-grid-column-${col}`;
  }

  getButtonColor(control: any) {
    if (control.text === 'Submit') {
      return 'success';
    } else if (control.text === 'Next') {
      return 'secondary';
    } else {
      return 'danger';
    }
  }

  getButtonExpand(control: any) {
    if (control.text === 'Submit') {
      return 'full';
    } else {
      return 'block';
    }
  }

  getControlOrder(control: any) {
    return parseInt(control.position.replace('.', ''), 10);
  }

  // onNext() {
  //   this.slides.slideNext();
  // }

  // onPrev() {
  //   this.slides.slidePrev();
  // }

  onButtonClick(control: any) {
    // handle button click event here
    if (control.navigate) {
      this.router.navigate([control.navigate]);
    }
  }

  onCheckboxChange(control: any) {
    console.log(control);
  }

  onInputChange(control: any) {
    console.log(control);
  }
}
