import { Flower } from '../../features/flowers/models/flowers.model';
import { BouquetNamePipe } from './bouquet.pipe';

describe('BouquetNamePipe', () => {
  let pipe: BouquetNamePipe;

  beforeEach(() => {
    pipe = new BouquetNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display name with bouquet"', () => {
    const flower: Flower = {
      id: 1,
      name: 'test',
      description: 'test',
      price: 10,
      origin: 'test',
      bouquet: true,
    };
    expect(pipe.transform(flower)).toBe('test - bouquet');
  });

  it('should display the normal name', () => {
    const flower: Flower = {
      id: 1,
      name: 'test',
      description: 'test',
      price: 10,
      origin: 'test',
      bouquet: false,
    };
    expect(pipe.transform(flower)).toBe('test');
  });
});
