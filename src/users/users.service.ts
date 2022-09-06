import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // 인스턴스 생성
    // 이유 = 객체를 바로 save() 에 넣으면 버그를 탐지하기 어려움
    const user = this.repo.create({ email, password });

    // 저장
    return this.repo.save(user);
  }
  findOne(id: number) {
    console.log(`called findOne`);

    if (!id) {
      return null;
    }
    // 없으면 Null
    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    // 일치하는 레코드 모두 반환, 없으면 빈배열
    return this.repo.findBy({ email });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user not found ${id}`);
    }
    // 찾지 않고 하려고 Object.assgin()해서 .update() 하는것같은데 잘 모르겟음.
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`user not found ${id}`);
    }
    return this.repo.remove(user);
  }
}
