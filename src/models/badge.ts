import { BadgeType } from './badge-type';

export type Badge = {
  name: string;
  description?: string;
  imageUrl?: string;
  type?: BadgeType;
  verified?: boolean;
};
