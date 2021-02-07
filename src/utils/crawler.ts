import fs from 'fs';
import { IAPIData } from './types';
import { filterAPIData } from './filter';

class Crowler{
  private writeFiles(fileName: string, data: string[], isMoudules?: boolean) {
    const path = `./src/${isMoudules ? 'data' : 'api'}/${fileName}${isMoudules && '.modules'}.ts`;
    return fs.writeFileSync(path, data.join(''));
  }

  // 写入API文件
  private writeAPIFiles(map: Map<string, IAPIData[]>) {
    map.forEach((item, key) => {
      const data = filterAPIData(item)
      this.writeFiles(key, data)
      // console.log('data:', data)
    })
  }

  constructor(private map: Map<string, IAPIData[]>) {
    this.writeAPIFiles(map)
  }
}

export default Crowler;