import {AuthorModel} from './author.model';

export class BookModel{
  id!: number;
  name!: string;
  price!: number;
  description!: string;
  status!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deadLine!: Date;
  image!: string;
  author!: AuthorModel;
  count!: number;
}
