import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @Expose()
  email: string;
}
