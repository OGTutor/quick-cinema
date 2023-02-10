import { Injectable } from '@nestjs/common';
import { IFileResponse } from './file.interface';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
	async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'default'
	): Promise<IFileResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`;
		await ensureDir(uploadFolder);

		const res: IFileResponse[] = await Promise.all(
			files.map(async (file) => {
				const fileExtension = file.originalname.split('.').pop();
				const fileName = uuid.v4() + '.' + fileExtension;

				await writeFile(`${uploadFolder}/${fileName}`, file.buffer);

				return {
					url: `/uploads/${folder}/${fileName}`,
					name: fileName,
				};
			})
		);

		return res;
	}
}
