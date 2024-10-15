import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAllFunc(): Promise<Task[]> {
        return await this.taskService.findAllTask();
    }

    @Get(':id')
    async findOneFunc(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.taskService.findOneTask(id);
    }

    @Post()
    async createTaskFunc(@Body() task: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(task);
    }

    @Patch(':id')
    async updateTaskFunc(@Param('id', ParseIntPipe) id: number, @Body() updatedTask: UpdateTaskDto): Promise<Task> {
        const task = await this.taskService.findOneTask(id); // タスクが存在するか確認
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return await this.taskService.updateTask(id, updatedTask);
    }

    @Delete(':id')
    async deleteTaskFunc(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.taskService.deleteTask(id);
    }
}
