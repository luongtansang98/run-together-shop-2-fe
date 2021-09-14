export class PromotionDTO {
  id?: number;
  code: string;
  name: string;
  description: string;
  promotionTypeName: string;
  promotionTypeId: number;
  value: string;
  startDate: any;
  endDate: any;
  canApplyForAll: boolean;
  isDisable: boolean;
}

export class PromotionTypeDTO {
  id?: number;
  name: string;
  description: string;
}
