import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
import { FormData } from "./form-data";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private apiUrl = "assets/form-data.json";
  currentPage: string = "1";
  formData: any;

  constructor() {}

  getCurrentPage(){
    return this.currentPage;
  }

  setCurrentPage(page : string) {
    this.currentPage = page;
  }

  setFormData(data: Object){
    this.formData = data;
  }

  getFormData(){
    return this.formData;
  }

  clearFormData(){
    this.currentPage = "1";
    this.formData = {};
  }
}