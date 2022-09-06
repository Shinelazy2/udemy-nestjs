import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });
  it('can create an instance of auth service', async () => {
    // Create a fake copy of the users service

    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp('shinelazy@naver.com', '1234');
    expect(user.password).not.toEqual('1234');
    const [salt, hash] = user.password.split('.');
    console.log(`salt : ${salt} hash: ${hash}`);

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('thorws an error if user signs up with email that is in use', async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

    try {
      await service.signUp('asd@asd.com', 'asd');
    } catch (error) {
      done();
    }
  });
});
