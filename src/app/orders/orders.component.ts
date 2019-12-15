import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { OrderItem } from '../shared/order-item.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orders;
  constructor(private orderService:OrderService,
    private router: Router) { }

  ngOnInit() {
   this.refreshList();
  }

  refreshList(){
    this.orderService.getOrders().subscribe(data => this.orders =data);
  }
  opeForEdit(orderId:number){
    this.router.navigate(['/order/edit/'+orderId]);
  }

  onOrderDelete(orderId:number){
    this.orderService.deleteOrder(orderId).subscribe(data =>{
       this.refreshList();
    });
  }

}
