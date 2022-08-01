import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Player } from '../models/player';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PlayerDto } from '../models/playerDto';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient: HttpClient) { 

  }
  getPlayers():Observable<ListResponseModel<Player>> {
    let newPath = this.apiUrl+"players/getall";
    return this.httpClient.get<ListResponseModel<Player>>(newPath);
  }
  getPlayersDto():Observable<ListResponseModel<PlayerDto>> {
    let newPath = this.apiUrl+"players/getalldto";
    return this.httpClient.get<ListResponseModel<PlayerDto>>(newPath);
  }
  add(player:any):Observable<ResponseModel>{
    let newPath = this.apiUrl + "players/add";
    return this.httpClient.post<ResponseModel>(newPath,player);
  }
}