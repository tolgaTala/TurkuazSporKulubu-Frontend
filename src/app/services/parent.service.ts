import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Parent } from '../models/parent';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient:HttpClient) { }

  getParents():Observable<ListResponseModel<Parent>> {
    let newPath = this.apiUrl+"parents/getall";
    return this.httpClient.get<ListResponseModel<Parent>>(newPath);
  }
  getParentByPhoneNumber(phoneNumber:string):Observable<SingleResponseModel<Parent>>{
    let newPath = this.apiUrl + "parents/getparentbyphonenumber?phoneNumber="+phoneNumber;
    return this.httpClient.get<SingleResponseModel<Parent>>(newPath)

  }
  add(parent:any):Observable<ResponseModel>{
    let newPath = this.apiUrl + "parents/add";
    return this.httpClient.post<ResponseModel>(newPath,parent);
  }

}
