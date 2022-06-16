import axios from "axios";

export interface HasId {
  id?: number;
}

// 同步类，用于与服务端进行数据交互（要求T类型 要满足 HasId）
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}
  // 根据id获取用户数据
  fetch(id: number) {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  // 创建、修改服务端用户信息
  save(data: T) {
    const { id } = data;
    if (typeof id !== "undefined") {
      return axios.patch(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
