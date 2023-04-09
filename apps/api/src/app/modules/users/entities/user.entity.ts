
// import { Order } from 'src/orders/entities/order.entity';

import { CoreEntity } from '../../../common/entities/core.entity';
import { Shop } from '../../shops/schemas/shop.shema';
import { Profile } from './profile.entity';

export class User extends CoreEntity {
  name: string;
  email: string;
  password?: string;
  shop_id?: number;
  profile?: Profile;
  shops?: Shop[];
  managed_shop?: Shop;
  is_active?: boolean = true;
  // address?: Address[];
  // orders?: Order[];
}
