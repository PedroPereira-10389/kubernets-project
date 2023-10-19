import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FilesService } from 'src/files/files.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExcelService } from 'src/excel/excel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { typeOrmAsyncConfig } from 'src/typeorm/typeOrm.config';
import { ConnectionModule } from 'src/modules/connection.module';

@Module({
  imports: [
    ConnectionModule,
    TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, FilesService, ConfigService, ExcelService],
})
export class ProductsModule { }
