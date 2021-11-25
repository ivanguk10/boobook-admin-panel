import {UserModel} from './user.model';
import {AddressModel} from './address.model';
import {BookModel} from './book.model';

export class OrderModel{
  id!: number;
  cost!: number;
  finalCost!: number;
  bonuses!: number;
  status!: number;
  user!: UserModel;
  address!: AddressModel;
  name!: string;
  phone!: string;
  books!: BookModel[];
}
