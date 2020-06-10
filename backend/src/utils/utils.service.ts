import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as moment from "moment";

@Injectable()
export class UtilsService {
    loadFilesFromSqlFolderToMapSync(currentDirPath: string): Map<string, string> {
        const sqlFilesDirPath = path.join(currentDirPath, 'sql');
        const fileMap = new Map();

        fs.readdirSync(sqlFilesDirPath).forEach(file => {
            fileMap.set(file, fs.readFileSync(path.join(sqlFilesDirPath, file), 'utf8'));
        });

        return fileMap;
    }

    getTimestamp(): string {
        return moment().millisecond(0).toISOString();
    }

    normalizeBtcBalance(balance: number): number {
        return balance/1e8;
    }
}
