import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller("/produto")
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/preco/crescente')
    @HttpCode(HttpStatus.OK)
    findByPrecoCrescente(): Promise<Produto[]> {
      return this.produtoService.findByPrecoCrescente();
  }

  @Get('/preco/decrescente')
    @HttpCode(HttpStatus.OK)
    findByPrecoDecrescente(): Promise<Produto[]> {
      return this.produtoService.findByPrecoDecrescente();
  }    

  @Get('/preco-maior-que/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMaiorQue(@Param('preco', ParseFloatPipe) preco: number): Promise<Produto[]> {
    return this.produtoService.findByPrecoMaiorQue(preco);
  }

  @Get('/preco-menor-que/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMenorQue(@Param('preco', ParseFloatPipe) preco: number): Promise<Produto[]> {
    return this.produtoService.findByPrecoMenorQue(preco);
  }

  @Post()
    @HttpCode(HttpStatus.CREATED)
    create (@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
    }
  
    @Put()
    @HttpCode(HttpStatus.OK)
    update (@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    }
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
      return this.produtoService.delete(id);
    }
}