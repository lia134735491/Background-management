import request from '@/util/request'
export let login = data=>{
    return request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data
    })
}

export let getUserInfo = ()=>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile'
    })
}
