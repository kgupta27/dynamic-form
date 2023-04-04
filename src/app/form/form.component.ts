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
import { FormData } from '../form-data';

interface MyData {
  [key: string]: any;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, SwiperModule],
})

export class FormPage implements OnInit {

  form!: FormGroup;
  pages: FormData[] = [];
  page: FormData | undefined;
  currentFormPage: string = "1";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    public toast: ToastService
  ) { 
      this.currentFormPage = this.formService.getCurrentPage().toString();

      this.activatedRoute.queryParams.subscribe((params: any) => {
        if (params && params.currentForm && params.currentForm > 0) {
          this.currentFormPage = JSON.parse(params.currentForm);
          this.createForm();
        }else {
          this.currentFormPage = "1";
        }
      });
  }

  ngOnInit() {
      this.createForm();
  }

  createForm(){
    this.http.get('assets/form-data.json').subscribe((data: any) => {
      this.pages = data.pages;

      const initialData = this.formService.getFormData();
      this.page = this.pages.find(el => el.pageid == this.currentFormPage);
      this.page?.controls.sort((a, b) => {
        const positionA = parseFloat(a.position);
        const positionB = parseFloat(b.position);
        return positionA - positionB;
      });
      console.log(this.page);
      this.form = this.formBuilder.group({});

      // this.pages.forEach((page: any) => {
        this.page?.controls.forEach((control: any) => {
          // Can use if we have validations in our JSON data
          const validators = [];
          if (control.validation) {
            if (control.validation === 'email') {
              validators.push(Validators.email);
            } else if (control.validation === 'password') {
              validators.push(Validators.minLength(6));
            }
          }
          if(!initialData) {
            this.form.addControl(control.id, this.formBuilder.control('', validators));
          } else {
            this.form.addControl(control.id, this.formBuilder.control( this.patchValue(control.id, initialData) , validators));
          }
        });
      });
    // });
  }

  patchValue(control: string, data : MyData) {
    if(data.hasOwnProperty(control)){
      return data[control];
    }else{
      return '';
    }
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

  // getControlOrder(control: any) {
  //   return parseInt(control.position.replace('.', ''), 10);
  // }

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
        this.formService.clearFormData();
        this.router.navigate(['home']);
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
