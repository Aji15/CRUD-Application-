import { Component, OnInit,ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './Service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'crud_Operation';

  displayedColumns: string[] = ['teamOne', 'teamTwo', 'date','trophy','venue','conclusion','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService){}

  ngOnInit(): void {
   this.getAllDetails();
  }

  openDialog() {
   this.dialog.open(DialogComponent, {
    width : "30%"
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllDetails();
      }
    })
  }
  getAllDetails(){
  this.api.getTeam()
  .subscribe({
    next:(res)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator; 
      this.dataSource.sort=this.sort;
    },
    error:(err)=>{
      alert("Error while fetching the details")
     
    }
  })
  }
  editTeam(row :any){
    this.dialog.open(DialogComponent ,{
       width: '30%',
       data : row
    }).afterClosed().subscribe(val =>{
       if(val === 'update'){
         this.getAllDetails();
       }
    })
  }
  deleteTeam(id : number){
    this.api.deleteTeam(id)
    .subscribe({ 
    
      next : (res)=>{
        alert("Details Deleted Successfully..!");
        this.getAllDetails();
      },
      error:()=>{
        alert("Error While Deletion..!");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

