import axios from 'axios';

/**
 * 查询-教辅列表查询
 */
export function find_tutorials_list() {
  return axios.get(`/classesWorks/tutorials/list`)
}

/**
 * 删除-教辅批量删除
 */
export function del_tutorials_batch(ids: string[]) {
  return axios.delete(`/classesWorks/tutorials/batch/${ids}`)
}

/**
 * 新增-教辅新增
 */
export function create_tutorials(data: object) {
  return axios.post(`/classesWorks/tutorials`, data)
}

/**
 * 修改-教辅修改
 */
export function update_tutorials(id: string, data: object) {
  return axios.put(`/classesWorks/tutorials/${id}`, data)
}

/**
 * 查询-问题分页查询
 */
export function find_questions_page() {
  return axios.get(`/classesWorks/questions/page`)
}

/**
 * 查询-问题列表查询
 */
export function find_questions_list() {
  return axios.get(`/classesWorks/questions/list`)
}

/**
 * 删除-问题批量删除
 */
export function del_questions_batch(ids: string[]) {
  return axios.delete(`/classesWorks/questions/batch/${ids}`)
}

/**
 * 新增-问题新增
 */
export function create_questions(data: object) {
  return axios.post(`/classesWorks/questions`, data)
}

/**
 * 修改-问题修改
 */
export function update_questions(id: string, data: object) {
  return axios.put(`/classesWorks/questions/${id}`, data)
}

/**
 * 查询-分页查询
 */
export function find_page() {
  return axios.get(`/classesWorks/page`)
}

/**
 * 查询-列表查询
 */
export function find_list() {
  return axios.get(`/classesWorks/list`)
}

/**
 * 查询-统计总数
 */
export function find_count() {
  return axios.get(`/classesWorks/count`)
}

/**
 * 删除-批量删除
 */
export function del_batch(ids: string[]) {
  return axios.delete(`/classesWorks/batch/${ids}`)
}

/**
 * 新增-新增
 */
export function create(data: object) {
  return axios.post(`/classesWorks`, data)
}

/**
 * 修改-修改
 */
export function update(id: string, data: object) {
  return axios.put(`/classesWorks/${id}`, data)
}

/**
 * 查询-主键查询
 */
export function find(id: string) {
  return axios.get(`/classesWorks/${id}`)
}
