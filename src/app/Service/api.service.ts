import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postTeam(data : any){
    return this.http.post<any>("http://localhost:3000/posts",data);
  }
  getTeam(){
    return this.http.get<any>("http://localhost:3000/posts");
  }
  putTeam(data : any,id : number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data);
  }
  deleteTeam(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id);
  }
}
