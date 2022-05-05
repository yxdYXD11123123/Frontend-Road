import request from "@/utils/request";
/**
 * 登录接口
 */
export function login({ mobile, code }) {
  return request.post("/authorizations", { mobile, code });
}

/**
 * 获取所有频道列表
 */
export function getChannels() {
  return request.get("/channels");
}

/**
 * 获取文章列表
 */
export function getArticlesApi(params = {}) {
  const { status, channel_id, begin_pubdate, end_pubdate, page, per_page } =
    params;
  return request.get("/mp/articles", {
    status,
    channel_id,
    begin_pubdate,
    end_pubdate,
    page,
    per_page,
  });
}

/**
 * 删除文章
 */
export function delArticleApi(id) {
  return request.delete("/mp/articles/" + id);
}

/**
 * 发表文章
 */
export function publishArticleApi(isDraft, params) {
  return request.post("/mp/articles?draft=" + isDraft.toString(), params);
}

/**
 * 获取文章详情
 */
export function getArticleDetailsApi(id) {
  return request.get("/mp/articles/" + id);
}
