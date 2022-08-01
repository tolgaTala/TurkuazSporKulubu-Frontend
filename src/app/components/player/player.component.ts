import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayerDto } from 'src/app/models/playerDto';
import { FootsService } from 'src/app/services/foots.service';
import { PlayerService } from 'src/app/services/player.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  players:Player[]=[]
  playersDto:PlayerDto[]
  selectedPlayers:PlayerDto[]
  loading:boolean
  constructor(private playerService:PlayerService,
    private footService:FootsService,
    private positionService:PositionService,
    ) { }

  ngOnInit(): void {
    this.getPlayers()
    this.getPlayersDto()
  }

  getPlayersDto(){
    this.playerService.getPlayersDto().subscribe(response=>{
      this.playersDto=response.data
    })
  }

  getPlayers(){
    this.playerService.getPlayers().subscribe(response=>{
      this.players=response.data
    })
  }
}
