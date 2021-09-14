export class OrderModel {
  id?: number;
  customerId: number;
  shipName: string;
  shipAddress: string;
  shipEmail: string;
  shipPhone: string;
  dliveryType: string;
  paymentType: string;
  orderDate: any;
  note: string;
}
