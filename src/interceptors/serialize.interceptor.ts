import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
interface ClassConstructor {
  new (...args: any[]): unknown;
  // new (...args: any[]): {};
}
export function Serialize(dto: ClassConstructor) {
  console.log('Serialize Called');

  return UseInterceptors(new SerializerInterceptor(dto));
}
// DTO 넣어서 패스워드 안보이게함..
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('SerializerInterceptor Called');
    // before
    // console.log(`context : ${context}`, context);
    // throw new Error("Method not implemented.");
    return next.handle().pipe(
      map((data: any) => {
        // after
        // Run somting before the response is sent out
        console.log(`data : ${data}`, data);
        return plainToClass(this.dto, data, {
          // 불필요한값 삭제 (UserDto 외에 삭제!)
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
