import fs from 'fs';


class Crowller{
  private writeFiles(fileName: string, data: string[], isMoudules?: boolean) {
    const path = `./src/${isMoudules ? 'data' : 'api'}/${fileName}${isMoudules && '.modules'}.ts`;
    return fs.writeFileSync(path, data.join(''));
  }

  constructor() {}
}

export default Crowller;