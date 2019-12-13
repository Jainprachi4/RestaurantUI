import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef}  from "@angular/material";
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { createHostListener } from '@angular/compiler/src/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: []
})
export class OrderItemComponent implements OnInit {
  
  formData:OrderItem;
   public items =[];
   isvalid:boolean=true;;
  constructor( 
     @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<OrderItemComponent>,
    private itemService:ItemService,
    private orderService:OrderService) { 
    }

  ngOnInit() {
    if(this.data.orderItemIndex==null){
      this.formData={
        orderItemId:null, 
        orderId:this.data.orderId,
        itemId:0,
        itemName:'',
        quantity:0,
        price:0,
        total:0
      }
    }else{
        this.formData=Object.assign({},this.orderService.orderItems[this.data.orderItemIndex]);
      }
    
    
    this.itemService.getItemList().subscribe(data => this.items =data);
   
    
  }
  updatePrice(ctrl){
    if(ctrl.selectedIndex==0){
      this.formData.price=0;
      this.formData.itemName='';
    }else{
      this.formData.price= this.items[ctrl.selectedIndex-1].price;
      this.formData.itemName=this.items[ctrl.selectedIndex-1].itemName;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.total= parseFloat((this.formData.price* this.formData.quantity).toFixed(2));
  }
  onSubmit(form:NgForm){
    if( this.validateForm(form.value)){
      if(this.data.orderItemIndex==null)
        this.orderService.orderItems.push(form.value);
      else
      this.orderService.orderItems[this.data.orderItemIndex]=form.value;
      this.dialogRef.close();
    }
    
   
  }

  validateForm(formData:OrderItem){
    this.isvalid=true;
    if(formData.itemId==0)
    this.isvalid=false;
    else if(formData.quantity==0)
    this.isvalid=false;
    return this.isvalid;

  }
  
}
