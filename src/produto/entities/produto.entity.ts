import { Transform, TransformFnParams } from "class-transformer"
import { IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity"
import { NumericTransformer } from "../../util/numerictransformers"

@Entity({ name: 'tb_produtos' }) //CREATE TABLE tb_produtos();
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    fabricante: string

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new NumericTransformer()})
    preco: number;

    @Column({length: 5000}) 
    foto: string; 

    // Chave estrangeira para a tabela Categoria
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE'
    }) // Definindo o relacionamento com a entidade Categoria
    categoria: Categoria;

}
