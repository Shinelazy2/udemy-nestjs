import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;

  @Expose()
  approved: boolean;
  // 뭐하는 놈이지?
  @Transform(({ obj }) => {
    return obj.user.id;
  })
  @Expose()
  userId: number;
}
