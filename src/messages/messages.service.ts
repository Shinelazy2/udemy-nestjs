import { MessagesRepository } from './messages.repository';

// GOOD
interface Repository {
  findOne(id: string);
  findAll();
  create(content: string);
}

export class MessagesService {
  // Bad
  // messagesRepository: MessagesRepository;
  // constructor() {
  //   this.messagesRepository = new MessagesRepository();
  // }

  // Better
  // messagesRepository: MessagesRepository;
  // constructor(repo: MessagesRepository) {
  //   this.messagesRepository = repo;
  // }

  // GOOD
  messagesRepository: Repository;
  constructor(repo: Repository) {
    this.messagesRepository = repo;
  }

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  findAll() {
    return this.messagesRepository.findAll();
  }

  create(content: string) {
    return this.messagesRepository.create(content);
  }
}
