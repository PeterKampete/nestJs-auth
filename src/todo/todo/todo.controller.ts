import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { TodoDTO } from '../todo.dto';
import { todos } from 'src/dummy-data/todos-mock';

let todosData = todos;

@Controller('todos')
export class TodoController {
  @Get()
  getTodos(): TodoDTO[] {
    return todosData;
  }

  @Post()
  createTodo(@Body() createTodo: TodoDTO) {
    const newTodo: TodoDTO = {
      id: (todosData.length + 1).toString(),
      ...createTodo,
    };
    todosData = [...todosData, newTodo];
    return todosData;
  }

  @Put(':id')
  updateTodo(@Body() updateTodo: TodoDTO, @Param('id') id): TodoDTO {
    todosData = todosData.map((todo) => (todo.id === id ? updateTodo : todo));
    return updateTodo;
  }
  
  @Delete(':id')
  deleteTodo(@Param('id') id: string | number) {
    const response = todosData.find((todo) => todo.id == id);
    todosData = todosData.filter((todo) => todo.id !== id);
    return response;
  }
}
