import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async findAllTask(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async findOneTask(id: number): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async createTask(task: CreateTaskDto): Promise<Task> {
        const newTask = this.taskRepository.create(task); // 新しい猫のエンティティを作成
        return this.taskRepository.save(newTask); // データベースに保存
    }

    async updateTask(id: number, updatedTask: UpdateTaskDto): Promise<Task> {
        const existingTask = await this.findOneTask(id);
        if (!existingTask) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        const updatedEntity = Object.assign(existingTask, updatedTask); // エンティティを更新し、データベースに保存
        return this.taskRepository.save(updatedEntity);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.findOneBy({ id });
        if (!result) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        await this.taskRepository.delete(id);
    }
}