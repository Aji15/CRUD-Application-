import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ApiService } from '../Service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  
  
})
export class DialogComponent implements OnInit {

  victory =["Team 1","Team 2"]

  formVictory !: FormGroup;
  actionBtn : String ="Save";
  constructor(private formBuilder: FormBuilder , 
    private api : ApiService , 
    @Inject(MAT_DIALOG_DATA) public editData : any = null,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.formVictory= this.formBuilder.group({
    teamOne : ['',Validators.required],
    teamTwo : ['',Validators.required],
    trophy :['',Validators.required],
    conclusion : ['',Validators.required],
    date : ['',Validators.required],
    venue : ['',Validators.required],
     
    });

    if(this.editData){
      this.actionBtn="Update";
      this.formVictory.controls['teamOne'] .setValue(this.editData.teamOne);
      this.formVictory.controls['teamTwo'] .setValue(this.editData.teamTwo);
      this.formVictory.controls['date'] .setValue(this.editData.date);
      this.formVictory.controls['trophy'] .setValue(this.editData.trophy);
      this.formVictory.controls['venue'] .setValue(this.editData.venue);
      this.formVictory.controls['conclusion'] .setValue(this.editData.conclusion);
    } 

  } 
  addDetail(){
    if(!this.editData){
     if(this.formVictory.valid){
      this.api.postTeam(this.formVictory.value)
      .subscribe({
        next:(res)=>{
          alert("Details Added Successfully");
          this.formVictory.reset();
          this.dialogRef.close('Save');
        },
        error : ()=>{
          alert("Error while Adding Details");
        }
      })
     }
     }
     else{
     
       this.updateTeam();
    }
  
}
updateTeam(){
  this.api.putTeam(this.formVictory.value,this.editData.id)
   .subscribe({
     next :(res)=>{
      alert("Details Updated Successfully");
      this.formVictory.reset();
      this.dialogRef.close('Update');
     },
     error :()=>{
      alert("Error while updation");
     }
   })
}
}