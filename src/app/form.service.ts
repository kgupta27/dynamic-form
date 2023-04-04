import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormData } from "./form-data";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private apiUrl = "assets/form-data.json";

  constructor(private http: HttpClient) {}

  getFormData(): Observable<FormData[]> {
    return this.http.get<FormData[]>(this.apiUrl);
  }
}