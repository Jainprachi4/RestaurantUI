import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { OrderItemComponent } from '../order-item/order-item.component';
import { OrderItem } from 'src/app/shared/order-item.model';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
sum:number;
items:OrderItem[];
customers:Customer[];
isValid:boolean=true;
  constructor(private service:OrderService,private customerService:CustomerService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.resetForm();
    this.customerService.getCustomers().subscribe(data => this.customers =data );
  }
 
  resetForm(form ? :NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData={
      orderId: null,
      orderNo: Math.floor(100000+Math.random()*900000).toString(),
      customerId: 0,
      payMethod: '',
      gTotal: 0
    };
    this.service.orderItems=[];
  }
  addOrUpdateOrderItem(orderItemIndex,orderId){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width= "50%";
    dialogConfig.data={
      orderItemIndex,orderId
    };
    this.dialog.open(OrderItemComponent,dialogConfig).afterClosed().subscribe(res =>{
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(i:number, orderItemId:number){
    this.service.orderItems.splice(i,1);
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.sum=0;
    this.items=this.service.orderItems;
    for(let data  of this.items){
      this.sum+=data.total;
    }
    
    this.service.formData.gTotal= parseFloat(this.sum.toFixed(2));
  }
  validateForm(){
    this.isValid=true;
    if(this.service.formData.customerId==0)
    this.isValid=false;
    else if(this.service.orderItems.length==0)
    this.isValid=false;
    return this.isValid;

  }

  onOrderSubmit(form:NgForm){
    if(this.validateForm()){
      
    }
  }
}
