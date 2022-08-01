import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Position } from '../models/position';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient:HttpClient) { }

  getPositions():Observable<ListResponseModel<Position>> {
    let newPath = this.apiUrl+"positions/getall";
    return this.httpClient.get<ListResponseModel<Position>>(newPath);
  }
  
  add(position:any):Observable<ResponseModel>{
    let newPath = this.apiUrl + "positions/add";
    return this.httpClient.post<ResponseModel>(newPath,position);
  }
}
