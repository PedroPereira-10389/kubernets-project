import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ExcelService } from 'src/excel/excel.service';
import { FilesService } from 'src/files/files.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private excelService: ExcelService, private azureService: FilesService) { }

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'findAllProducts' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('findOneProduct')
  findOne(@Payload() id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('updateProduct')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern('removeProduct')
  remove(@Payload() id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern({ cmd: 'importAllProducts' })
  async importProducts(fileUrl: any) {
    const fileUrlIndex = fileUrl.lastIndexOf('/');
    var result = fileUrl.substring(fileUrlIndex + 1);
    const file = await this.azureService.getfileStream(result, 'home');
    const excelContent = await this.excelService.readExcelData(file);
    var countSuccess = 0;
    var countFailed = 0;
    var newProducts = []
    if (excelContent.length > 0) {
      const createProductPromises = excelContent.map(async element => {
        const newProduct = new CreateProductDto();
        newProduct.reference = element[1];
        newProduct.name = element[2];
        newProduct.price = element[3];
        newProduct.quantity = element[4];
        try {
          await this.productsService.create(newProduct);
          newProducts.push(newProduct);
          countSuccess++;
        } catch (error) {
          countFailed++;
        }
      });

      await Promise.all(createProductPromises);
      return { status: 200, message: { success: countSuccess, failed: countFailed, products: newProducts } }
    }

    return { status: 200, message: { success: countSuccess, failed: countFailed } }
  }
}
