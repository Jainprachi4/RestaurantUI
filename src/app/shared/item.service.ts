import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) {
   
    }
    getItemList():Observable<Item[]>{
      return  this.http.get<Item[]>(environment.apiUrl+'getAllItems')
    }

   }
   

