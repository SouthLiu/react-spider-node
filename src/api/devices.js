import axios from 'axios'
/**
 * 新增
 * @param {Object} data
 */
export function create(data) {
  return axios.post(`/device/devices`, data)
}

/**
 * 修改设备
 * @param {String} id  主键ID
 * @param {Object} data
 */
export function update(id, data) {
  return axios.put(`/device/devices/${id}`, data)
}

/**
 * 删除
 * @param {Array} data ids
 */
export function del(data) {
  return axios.delete(`/device/devices`, { data })
}

/**
 * 查询-根据主键查询
 * @param {String} id
 */
export function find_one(id) {
  return axios.get(`/device/devices/${id}/detail`)
}

/**
 * 查询-树形列表数据
 * @param {Object} data
 */
export function find_tree(data) {
  return axios.post(`/device/devices/tree`, data)
}

/**
 * 查询-根据条件分页查询
 * @param {Object} data
 */
export function find_page(data) {
  return axios.get(`/device/devices/page`, { params: data })
}

/**
 * 查询-根据条件查询
 * @param {Object} data
 */
export function find_list(data) {
  return axios.get(`/device/devices/list`, { params: data })
}

/**
 * 查询-根据条件查询
 * @param {String} id
 * @param {Object} data
 */
export function copy(id, data) {
  return axios.put(`/device/devices/${id}/copy?name=${data}`)
}

/**
 * 查询-根据条件查询
 * @param {String} id
 * @param {Object} data
 */
export function bindArea(data) {
  return axios.post(`/device/devices/bindArea`, data)
}

export default {
  create,
  update,
  del,
  find_one,
  find_tree,
  find_page,
  find_list,
  copy,
  bindArea
}
