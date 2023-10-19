
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
    constructor(private readonly configService: ConfigService) { }
    private containerName: string;

    private async getBlobServiceInstance() {
        const connectionString = this.configService.get('AZURE_STORAGE_CONNECTION');
        const blobClientService = await BlobServiceClient.fromConnectionString(connectionString,);
        return blobClientService;
    }

    private async getBlobClient(imageName: string): Promise<BlockBlobClient> {
        const blobService = await this.getBlobServiceInstance();
        const containerName = this.containerName;
        const containerClient = blobService.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);

        return blockBlobClient;
    }

    public async uploadFile(file: Express.Multer.File, containerName: string) {
        this.containerName = containerName;
        const extension = file.originalname.split('.').pop();
        const file_name = uuidv4() + '.' + extension;
        const blockBlobClient = await this.getBlobClient(file_name);
        const fileUrl = blockBlobClient.url;
        await blockBlobClient.uploadData(file.buffer);
        return fileUrl;
    }

    async getfileStream(fileName: string, containerName: string) {
        this.containerName = containerName;
        const blobClient = await this.getBlobClient(fileName);
        var blobDownloaded = await (blobClient).downloadToBuffer();
        return blobDownloaded;
    }
}
