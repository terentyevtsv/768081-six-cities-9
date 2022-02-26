import { User } from './offer';

export type Review =  {
  id: number,
  user: User,
  rating: number,
  date: Date,
  comment: string
};
