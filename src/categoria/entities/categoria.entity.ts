import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "../../produto/entities/produto.entity"


@Entity({ name: 'tb_categoria' }) //CREATE TABLE tb_categorias();
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    nome: string

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[]; //Relacionamento com a tabela de produtos
}