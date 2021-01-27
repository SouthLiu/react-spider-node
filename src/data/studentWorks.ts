import axios from 'axios';

/**
 * 查询-教辅分页查询
 */
export function find_page() {
  return axios.get(`/studentWorks/tutorials/page`)
}

/**
 * 查询-教辅列表查询
 */
export function find_list() {
  return axios.get(`/studentWorks/tutorials/list`)
}

/**
 * 删除-教辅批量删除
 */
export function del_batch(ids: string[]) {
  return axios.delete(`/studentWorks/tutorials/batch/${ids}`)
}

/**
 * 新增-教辅新增
 */
export function create_tutorials(data: object) {
  return axios.post(`/studentWorks/tutorials`, data)
}

/**
 * 修改-教辅修改
 */
export function update_tutorials(id: string, data: object) {
  return axios.put(`/studentWorks/tutorials/${id}`, data)
}

/**
 * 查询-教辅主键查询
 */
export function find_tutorials() {
  return axios.get(`/studentWorks/tutorials`)
}

/**
 * 查询-问题分页查询
 */
export function find_page() {
  return axios.get(`/studentWorks/questions/page`)
}

/**
 * 查询-问题列表查询
 */
export function find_list() {
  return axios.get(`/studentWorks/questions/list`)
}

/**
 * 删除-问题批量删除
 */
export function del_batch(ids: string[]) {
  return axios.delete(`/studentWorks/questions/batch/${ids}`)
}

/**
 * 新增-问题修改
 */
export function create_questions(data: object) {
  return axios.post(`/studentWorks/questions`, data)
}

/**
 * 修改-问题新增
 */
export function update_questions(id: string, data: object) {
  return axios.put(`/studentWorks/questions/${id}`, data)
}

/**
 * 查询-问题主键查询
 */
export function find_questions() {
  return axios.get(`/studentWorks/questions`)
}

/**
 * 查询-分页查询
 */
export function find_page() {
  return axios.get(`/studentWorks/page`)
}

/**
 * 查询-列表查询
 */
export function find_list() {
  return axios.get(`/studentWorks/list`)
}

/**
 * 查询-统计总数
 */
export function find_count() {
  return axios.get(`/studentWorks/count`)
}

/**
 * 删除-批量删除
 */
export function del_batch(ids: string[]) {
  return axios.delete(`/studentWorks/batch/${ids}`)
}

/**
 * 新增-新增
 */
export function create(data: object) {
  return axios.post(`/studentWorks`, data)
}

/**
 * 修改-修改
 */
export function update(id: string, data: object) {
  return axios.put(`/studentWorks/${id}`, data)
}

/**
 * 查询-主键查询
 */
export function find(id: string) {
  return axios.get(`/studentWorks/${id}`)
}
