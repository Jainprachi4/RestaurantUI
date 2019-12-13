export class Order {
    constructor(
   public orderId: number,
    public orderNo: string,
    public customerId: number,
    public payMethod: string,
    public gTotal: number){}
}
