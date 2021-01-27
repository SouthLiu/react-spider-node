import axios from 'axios';

/**
 * 查询-分页查询
 */
export function find_page() {
  return axios.get(`/studentWorkQuestionReviseCorrects/page`)
}

/**
 * 查询-列表查询
 */
export function find_list() {
  return axios.get(`/studentWorkQuestionReviseCorrects/list`)
}

/**
 * 查询-统计总数
 */
export function find_count() {
  return axios.get(`/studentWorkQuestionReviseCorrects/count`)
}

/**
 * 删除-批量删除
 */
export function del_batch(ids: string[]) {
  return axios.delete(`/studentWorkQuestionReviseCorrects/batch/${ids}`)
}

/**
 * 新增-新增
 */
export function create(data: object) {
  return axios.post(`/studentWorkQuestionReviseCorrects`, data)
}

/**
 * 修改-修改
 */
export function update(id: string, data: object) {
  return axios.put(`/studentWorkQuestionReviseCorrects/${id}`, data)
}

/**
 * 查询-主键查询
 */
export function find(id: string) {
  return axios.get(`/studentWorkQuestionReviseCorrects/${id}`)
}
