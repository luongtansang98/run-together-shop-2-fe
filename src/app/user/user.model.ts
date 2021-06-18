import { UserRoleEnum } from '../helper/enum/user-role.enum';
import { RoleModel } from '../helper/models/role.model';

export class UserModel {
  public id: string;
  public fullName: string;
  public email?: string;
  public role: RoleModel;
  public username?: string;
  public password?: string;
  public phoneNumber?: string;
  public defaultTemplate: number;
  public mustChangePassword?: boolean;
  public roleCode?: string;
  public havePermissionAddCashReceipt : boolean;

  constructor(){}

  public isAdminUser(): boolean {
    return this.role && this.role.value === UserRoleEnum.ADMIN;
  }

  public isManager(): boolean {
    return this.role && this.role.value === UserRoleEnum.MANAGER;
  }

  public isCustomer(): boolean {
    return this.role && this.role.value === UserRoleEnum.CUSTOMER;
  }
}
