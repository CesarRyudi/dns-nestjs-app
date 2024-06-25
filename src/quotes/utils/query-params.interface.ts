export interface IFindManyQueryParams {
  skip: number;
  take: number;
  orderBy: object;
  company: string;
  filter?: string;
  table?: string;
}