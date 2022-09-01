import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-messages.dto';
@Controller('messages')
export class MessagesController {
  @Get()
  listMessage() {
    console.log('listMessage');
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
  }

  @Get('/:id')
  getMessages(@Param('id') id: any) {
    console.log(id);
  }
}
