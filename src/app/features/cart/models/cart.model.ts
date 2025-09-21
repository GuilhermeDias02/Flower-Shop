import { User } from '../../auth/models/user.model';
import { Flower } from '../../flowers/models/flowers.model';

export interface Cart {
  flowers: Map<Flower, number>;
  user: User;
}
