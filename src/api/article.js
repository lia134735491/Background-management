import request from '@/util/request'

export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params
    })
}

export const getArticleChannels = () => {
    return request({
      method: 'GET',
      url: '/mp/v1_0/channels'
    })
}

export const deleteArticle = articleId => {
    return request({
      method: 'DELETE',
      // 接口文档中的写的路径参数需要在 url 中传递
      // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
      url: `/mp/v1_0/articles/${articleId}`
    })
}
