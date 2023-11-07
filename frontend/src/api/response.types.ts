import IWord from '@/types/IWord';

export interface IGetWordlistResponse extends Response {
  data: IWord[];
}
