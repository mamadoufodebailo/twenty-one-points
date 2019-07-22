import { IUser } from 'app/core/user/user.model';

export const enum Units {
  KG = 'KG',
  LB = 'LB'
}

export interface IParameters {
  id?: number;
  weeklyGoal?: number;
  weight?: Units;
  parameter?: IUser;
}

export class Parameters implements IParameters {
  constructor(public id?: number, public weeklyGoal?: number, public weight?: Units, public parameter?: IUser) {}
}
