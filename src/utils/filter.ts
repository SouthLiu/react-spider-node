import { APIMethof, IAPIData } from "./types";

export function filterAPIData(datas: IAPIData[]) {
  const data: string[] = [
    `import axios from 'axios';
`
  ];
  datas.length && datas.map(item => {
    const { method, path, description } = item;
    const keys: string[] = path?.split('/') as string[];
    const isExistSuffix = keys?.length > 2;
    let labels = isExistSuffix ?`_${keys.splice(2).join('_')}` : ''
    switch(method) {
      case APIMethof.GET:
        data.push(`
/**
 * 查询-${description}
 */
export function find${labels}(${!isExistSuffix ? 'id: string' : ''}) {
  return axios.get(\`${path}${!isExistSuffix ? '/${id}' : ''}\`)
}
`)
        break;
      
      case APIMethof.CREATE:
        data.push(`
/**
 * 新增-${description}
 */
export function create${labels}(data: object) {
  return axios.post(\`${path}\`, data)
}
`)
        break;
      
      case APIMethof.UPDATE:
        data.push(`
/**
 * 修改-${description}
 */
export function update${labels}(id: string, data: object) {
  return axios.put(\`${path}/\${id}\`, data)
}
`)
        break;
  
      case APIMethof.DELETE:
        data.push(`
/**
 * 删除-${description}
 */
export function del${labels}(ids: string[]) {
  return axios.delete(\`${path}/\${ids}\`)
}
`)
        break;
      
      default:
        break;
    }
  })

  return data;
}