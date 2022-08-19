import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Player } from 'src/app/models/player';
import { PlayerDto } from 'src/app/models/playerDto';
import { FootsService } from 'src/app/services/foots.service';
import { PlayerService } from 'src/app/services/player.service';
import { PositionService } from 'src/app/services/position.service';
import { PlayerAddComponent } from '../player-add/player-add.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';

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
  list:number[]=[]
  constructor(private playerService:PlayerService,
    private footService:FootsService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService,
    private positionService:PositionService,
    private modalService: NgbModal
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
  deleteSelectPlayers() {
    this.confirmationService.confirm({
        message: 'Seçili Ürünler Gizlenecek!!',
        header: 'DİKKAT',
        icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hiddenProducts()
                this.selectedPlayers = [];
                this.list=[]
                this.toastrService.info("Seçili Ürünler Gizlendi");
                this.ngOnInit()
            }            
    });
  }
  hiddenProducts(){
    if(this.selectedPlayers){
      console.log("girdi");
      
      this.selectedPlayers.forEach(item => {
      this.list.push(item.playerId)
      });
      this.playerService.hidden(this.list).subscribe(response=>{
        this.list= []
      })  
    }
     
  }
  open(player: Player) {
    const modalRef = this.modalService.open(PlayerUpdateComponent, {size: 'xl'});
    modalRef.componentInstance.gelenPlayer = player;
    console.log(player);
  }
  openPlayerAddModal() {
    const modalRef = this.modalService.open(PlayerAddComponent, {size: 'xl'});
  }
}
