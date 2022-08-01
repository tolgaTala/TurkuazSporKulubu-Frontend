import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foot } from '../models/foot';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FootsService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient:HttpClient) { }

  getFoots():Observable<ListResponseModel<Foot>> {
    let newPath = this.apiUrl+"foots/getall";
    return this.httpClient.get<ListResponseModel<Foot>>(newPath);
  }
  add(foot:any):Observable<ResponseModel>{
    let newPath = this.apiUrl + "foots/add";
    return this.httpClient.post<ResponseModel>(newPath,foot);
  }
}
