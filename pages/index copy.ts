import fs from 'fs';
import Analyzer from './utils/analyzer';

class Crowller{
  // private data: string[] = [];

  // async getAnalyzer() {
  //   this.data = await analyzer;
  //   console.log('data:', this.data)
  // };

  async writeFiles() {
    const data = await new Analyzer();
    return await fs.writeFileSync("./data/data.json", JSON.stringify(data, null, "\t"));
  }

  constructor() {
    this.writeFiles()
  }
}

new Crowller()