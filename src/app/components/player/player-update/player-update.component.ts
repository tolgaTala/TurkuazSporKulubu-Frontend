import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from 'src/app/services/position.service';
import { ParentService } from 'src/app/services/parent.service';
import { FromClubService } from 'src/app/services/from-club.service';
import { FootsService } from 'src/app/services/foots.service';
import { Foot } from 'src/app/models/foot';
import { FromClub } from 'src/app/models/fromClub';
import { Parent } from 'src/app/models/parent';
import { Position } from 'src/app/models/position';

@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.css']
})
export class PlayerUpdateComponent implements OnInit {

  @Input() gelenPlayer: any;
  selectedFile: File;
  foots:Foot[]
  fromClubs:FromClub[]
  parent:Parent
  parents:Parent[]
  positions:Position[]
  playerUpdateForm :FormGroup
  constructor(private playerService: PlayerService,
              private formBuilder:FormBuilder, 
              private toastrService:ToastrService,
              private footsService:FootsService,
              private fromClubService:FromClubService,
              private parentService:ParentService,
              private positionService:PositionService,
              public modal: NgbActiveModal ) { }

  ngOnInit(): void {
    this.getPositions()
    this.getFoots();
    this.getFromClubs();
    this.createPlayerUpdateForm(this.gelenPlayer);
  }
  getPositions(){
    this.positionService.getPositions().subscribe(response=>{
      this.positions=response.data
    })
  }

  getFromClubs(){
    this.fromClubService.getFromClubs().subscribe(response=>{
      this.fromClubs=response.data
    })
  }

  getFoots(){
    this.footsService.getFoots().subscribe(response=>{
      this.foots=response.data
    })
  }
  createPlayerUpdateForm(player: Player) {
    this.playerUpdateForm = this.formBuilder.group({
      firstName: [player.firstName, Validators.required],
      lastName: [player.lastName, Validators.required],
      positionId: [player.positionId, Validators.required],
      footId: [player.footId, Validators.required],
      fromClubId: [player.fromClubId, Validators.required],
      parentId: [player.parentId],
      tcNo: [player.tcNo, Validators.required],
      licanceNo: [player.licanceNo, Validators.required],
      goneClub: [player.goneClub],
      birthdayDate: [player.birthdayDate, Validators.required],
      birthPlace: [player.birthPlace, Validators.required],
      motherName: [player.motherName, Validators.required],
      fatherName: [player.fatherName, Validators.required],
      school: [player.school, Validators.required],
      photoPath: [player.photoPath], 
    });
  }
  
  updatePlayer() {
    if (this.playerUpdateForm.valid) {
      const formData = new FormData();
        formData.append('playerId', this.gelenPlayer.playerId);
        formData.append('firstName', this.playerUpdateForm.get('firstName').value);
        formData.append('lastName', this.playerUpdateForm.get('lastName').value);
        formData.append('positionId', this.playerUpdateForm.get('positionId').value);
        formData.append('footId', this.playerUpdateForm.get('footId').value);
        formData.append('fromClubId', this.playerUpdateForm.get('fromClubId').value);
        formData.append('parentId',this.gelenPlayer.parentId.toString());
        formData.append('tcNo', this.playerUpdateForm.get('tcNo').value);
        formData.append('licanceNo', this.playerUpdateForm.get('licanceNo').value);
        formData.append('goneClub', this.playerUpdateForm.get('goneClub').value);
        formData.append('birthdayDate', this.playerUpdateForm.get('birthdayDate').value);
        formData.append('birthPlace', this.playerUpdateForm.get('birthPlace').value);
        formData.append('motherName', this.playerUpdateForm.get('motherName').value);
        formData.append('fatherName', this.playerUpdateForm.get('fatherName').value);
        formData.append('school', this.playerUpdateForm.get('school').value);
        formData.append('photoPath', this.gelenPlayer.photoPath);
      if(this.selectedFile){
        formData.append(
          'Image',this.selectedFile,this.selectedFile.name
        );
        this.playerService.updateWithImage(formData).subscribe((response) => {
          this.toastrService.success(response.message);
          this.modal.dismiss();
          window.location.reload();
        });
      }
      else{
        this.playerService.update(formData).subscribe((response) => {
          this.toastrService.success(response.message);
          this.modal.dismiss();
          window.location.reload();
        });
      }
      
    }else{
      this.toastrService.error("Lütfen Boş Bırakmayın")
    }
  }
  onFileSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.playerUpdateForm.patchValue({
        imagePath: file,
      });
      this.playerUpdateForm.get('photoPath').updateValueAndValidity();
    }
  }
}
