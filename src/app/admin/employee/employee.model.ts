export class EmployeeDTO{
  public id:any;
  public name:any;
  public gender:boolean;
  public phoneNumber:any;
  public address:any;
  public position:any;
  public salary:any;
  public imageOfEmployee?:File;
}

export interface User {
  id: string,
  name: string,
  address: string,
  positionId:number,
  phoneNumber:string,
  positionName:string,
  imgPath: string
}
export interface UserToCreate {
  name: string,
  address: string,
  phoneNumber:string,
  positionId:number,
  imgPath: string
}
export class Position{
  id:number;
  name:string;
}
