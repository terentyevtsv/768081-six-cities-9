import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 2,
      avatarImage: 'img/avatar-max.jpg',
      isPro: false,
      name: 'Max',
    },
    rating: 5,
    date: new Date(2020, 2, 1),
    comment: 'I lived here last year. It is very comfortable!',
  },
  {
    id: 2,
    user: {
      id: 2,
      avatarImage: 'img/avatar-max.jpg',
      isPro: false,
      name: 'Max',
    },
    rating: 1,
    date: new Date(2021, 5, 1),
    comment: 'Very bad!',
  },
  {
    id: 3,
    user: {
      id: 1,
      avatarImage: 'img/avatar-angelina.jpg',
      isPro: true,
      name: 'Angelina',
    },
    rating: 3,
    date: new Date(2019, 3, 2),
    comment: 'medium!',
  },
  {
    id: 4,
    user: {
      id: 1,
      avatarImage: 'img/avatar-angelina.jpg',
      isPro: true,
      name: 'Angelina',
    },
    rating: 5,
    date: new Date(2018, 3, 2),
    comment: 'Everything ok!',
  },
];
