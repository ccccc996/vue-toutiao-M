/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
 * 获取频道的文章列表
 */
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取文章详情
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_1/articles/${articleId}`
  })
}
