import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTaskTable1728628577491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'task',
                columns: [
                    {
                        name: 'id', //カラム名
                        type: 'int',
                        isPrimary: true, //このカラムはプライマリキーとして設定されており、一意な値を持つ。
                        isGenerated: true, //このカラムは自動生成されることを指定
                        generationStrategy: 'increment', //自動生成の戦略を increment として指定。つまり、id カラムの値は新しいレコードが挿入されるごとに自動的に 1 ずつ増加。
                    },
                    {
                        name: 'task', //カラム名
                        type: 'varchar', //データ型は varchar（可変長の文字列）
                        length: '255', //このカラムの最大長を 255 文字に設定
                    },
                ],
            }),
            true, //createTable メソッドの第2引数に true を渡すことで、テーブルが存在しない場合のみ作成することを指定。つまり、既に同じ名前のテーブルが存在している場合には、何も行わない。
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task');
    }

}
