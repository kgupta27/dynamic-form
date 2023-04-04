import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import SwiperCore, { Pagination, Keyboard } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/angular';
import { SwiperModule } from 'swiper/angular';
import { FormService } from '../form.service';
import { ToastService } from '../services/toast.service';

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
  currentFormPage: Number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    public toast: ToastService
  ) { 
      this.currentFormPage = this.formService.getCurrentPage();

      this.activatedRoute.queryParams.subscribe((params: any) => {
        if (params && params.currentForm && params.currentForm > 0) {
          this.currentFormPage = JSON.parse(params.currentForm);
          this.createForm();
        }else {
          this.currentFormPage = 1;
        }
      });
  }

  ngOnInit() {
      this.createForm();
  }

  createForm(){
    this.http.get('assets/form-data.json').subscribe((data: any) => {
      this.pages = data.pages;

      this.pages = this.pages.filter(el => el.pageid == this.currentFormPage)
      this.form = this.formBuilder.group({});

      this.pages.forEach((page: any) => {
        page.controls.forEach((control: any) => {
          // const validators = [];
          // if (control.validation) {
          //   if (control.validation === 'email') {
          //     validators.push(Validators.email);
          //   } else if (control.validation === 'password') {
          //     validators.push(Validators.minLength(6));
          //   }
          // }
          this.form.addControl(control.id, this.formBuilder.control('', []));
          console.log(this.pages)
        });
      });
    });
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

  onButtonClick(control: any) {
    // handle button click event here
    if (control.navigate > 0) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          currentForm: control.navigate
        }
      };
      this.formService.setCurrentPage(control.navigate);
      this.router.navigate(['form'], navigationExtras);
      console.log("this.form.value", this.form.value);

      const data = {
        ...this.formService.getFormData(),
        ...this.form.value
      }

      this.formService.setFormData(data);
    } else {
        this.toast.showToast('Form created successfully');
    }
  }

  onCheckboxChange(control: any) {
    console.log(control);
  }

  onInputChange(control: any) {
    console.log(control);
  }
}
