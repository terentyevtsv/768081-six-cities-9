import { User } from './offer';

export type Review = {
  id: number,
  user: User,
  rating: number,
  date: string,
  comment: string
};

export type Comment = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
};
