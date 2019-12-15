import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData:Order;
  orderItems:OrderItem[];
  constructor(
    private http : HttpClient
  ) { }

  saveOrUpdateOrder(){
    var body={
      ...this.formData,
      orderItem:this.orderItems
    }
    return this.http.post(environment.apiUrl+'postOrder',body);
  }

  getOrders():Observable<Order[]>{
   return this.http.get<Order[]>(environment.apiUrl+'getOrders');
  }

   getOrderById(id:any):any{
   return this.http.get(environment.apiUrl+'getOrderById/'+id);
  }

  deleteOrder(id:number){
    return this.http.delete(environment.apiUrl+"deleteOrder/"+id);
  }
}
