import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateCatDto {
    @IsOptional()
    @IsString() //stringでないとエラー
    name: string;

    @IsOptional() //プロパティが省略可能であることを示す
    @IsNumber() //numberでないとエラー
    @Min(0) //プロパティの数値が指定した最小値以上でないとエラー
    age?: number;
}
