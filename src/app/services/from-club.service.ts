import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FromClub } from '../models/fromClub';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FromClubService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient:HttpClient) { }

  getFromClubs():Observable<ListResponseModel<FromClub>> {
    let newPath = this.apiUrl+"fromClubs/getall";
    return this.httpClient.get<ListResponseModel<FromClub>>(newPath);
  }
  add(fromClub:any):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fromClubs/add";
    return this.httpClient.post<ResponseModel>(newPath,fromClub);
  }
}
