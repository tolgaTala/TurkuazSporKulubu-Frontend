import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { FootsService } from 'src/app/services/foots.service';
import { Foot } from 'src/app/models/foot';
import { FromClub } from 'src/app/models/fromClub';
import { FromClubService } from 'src/app/services/from-club.service';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { Position } from 'src/app/models/position';
import { PositionService } from 'src/app/services/position.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

  player:Player
  playerAddForm:FormGroup
  parentAddForm:FormGroup
  selectedFile: File;
  foots:Foot[]
  fromClubs:FromClub[]
  parent:Parent
  parents:Parent[]
  positions:Position[]
  constructor(private playerService:PlayerService,
    private formBuilder: FormBuilder,
    private footsService:FootsService,
    private fromClubService:FromClubService,
    private parentService:ParentService,
    private positionService:PositionService,
    private toastrService: ToastrService )
    { }

  ngOnInit(): void {
    this.getPositions()
    this.getFoots();
    this.getFromClubs();
    this.createParentAddForm()
    this.createPlayerAddForm()
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

  createParentAddForm(){
    this.parentAddForm = this.formBuilder.group({
      parentName: ['',Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.email],
      adress: ['', Validators.required],
      job: ['', Validators.required]
    })
  }

  createPlayerAddForm(){
    this.playerAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      positionId: ['', Validators.required],
      footId: ['', Validators.required],
      fromClubId: ['', Validators.required],
      parentId: [''],
      tcNo: ['', Validators.required],
      licanceNo: ['', Validators.required],
      goneClub: [''],
      birthdayDate: ['', Validators.required],
      birthPlace: ['', Validators.required],
      formaNumber: ['', Validators.required],
      motherName: ['', Validators.required],
      fatherName: ['', Validators.required],
      school: ['', Validators.required],
      photoPath: [''],    
    });
  }

  parentAddButton=true
  playerAddButton=false
  parentAdd(){
    if(this.parentAddForm.valid){
      let parentModel=Object.assign({},this.parentAddForm.value)
      this.parentService.add(parentModel).subscribe(response=>{
        this.toastrService.success(response.message)    
        this.parentAddButton=false
        this.playerAddButton=true
      });
    }
    else{
      this.toastrService.error("Lütfen boş bırakmayın!")      
    }
  }
  
  playerAdd(){
    
      if (this.playerAddForm.valid) {
        this.parentService.getParentByPhoneNumber(this.parentAddForm.get('phoneNumber').value).subscribe(response=>{
          this.parent=response.data
          const formData = new FormData();
        formData.append('firstName', this.playerAddForm.get('firstName').value);
        formData.append('lastName', this.playerAddForm.get('lastName').value);
        formData.append('positionId', this.playerAddForm.get('positionId').value);
        formData.append('footId', this.playerAddForm.get('footId').value);
        formData.append('fromClubId', this.playerAddForm.get('fromClubId').value);
        formData.append('parentId',this.parent.parentId.toString());
        formData.append('tcNo', this.playerAddForm.get('tcNo').value);
        formData.append('licanceNo', this.playerAddForm.get('licanceNo').value);
        formData.append('goneClub', this.playerAddForm.get('goneClub').value);
        formData.append('birthdayDate', this.playerAddForm.get('birthdayDate').value);
        formData.append('birthPlace', this.playerAddForm.get('birthPlace').value);
        formData.append('formaNumber', this.playerAddForm.get('formaNumber').value);
        formData.append('motherName', this.playerAddForm.get('motherName').value);
        formData.append('fatherName', this.playerAddForm.get('fatherName').value);
        formData.append('school', this.playerAddForm.get('school').value);
        formData.append(
            'image',
            this.selectedFile,
            this.selectedFile.name
          );
        console.log(formData);
        
        this.playerService.add(formData).subscribe((response) => {
         this.toastrService.success(response.message);
          window.location.reload();
        });
        })
        
      }else{
        this.toastrService.error("Lütfen Boş Bırakmayın")
      }
    }
    
    onFileSelected(event: any) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFile = <File>event.target.files[i];
        const file = (event.target as HTMLInputElement).files[i];
        this.playerAddForm.patchValue({
          imagePath: file,
        });
        this.playerAddForm.get('photoPath').updateValueAndValidity();
      }
    }
  }

  

