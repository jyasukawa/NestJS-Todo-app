import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateTaskDto {
    @IsString({ message: 'Task must be a string' }) //stringでないとエラー
    @IsNotEmpty({ message: 'Task must not be empty' }) // 空文字や空白を許可しない
    @MaxLength(255, { message: 'Task must not exceed 255 characters' }) // 255文字以内に制限
    task: string;
}
