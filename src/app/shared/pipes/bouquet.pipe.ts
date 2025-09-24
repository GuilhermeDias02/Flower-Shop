import { Pipe, PipeTransform } from '@angular/core';
import { Flower } from '../../features/flowers/models/flowers.model';

@Pipe({
  name: 'bouquetName',
  standalone: true,
})
export class BouquetNamePipe implements PipeTransform {
  transform(flower: Flower): string {
    if (flower) {
      if (flower.bouquet) {
        return `${flower.name} - bouquet`;
      }
      return flower.name;
    }
    return '';
  }
}
