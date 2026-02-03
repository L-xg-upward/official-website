import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { Modal, notification, message } from 'ant-design-vue'
import qs from 'qs'
import { config } from './config'
import errorCode from './errorCode'
const { result_code, base_url, request_timeout } = config

// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
    '无效的刷新令牌',
    '刷新令牌已过期'
]

// 是否显示重新登录
export const isRelogin = { show: false }
// Axios 无感知刷新令牌
let requestList: any[] = []
let isRefreshToken = false
const whiteList: string[] = ['/login', '/refresh-token']

// 创建axios实例
const service: AxiosInstance = axios.create({
    baseURL: base_url,
    timeout: request_timeout,
    withCredentials: false,
    paramsSerializer: (params) => {
        return qs.stringify(params, { allowDots: true })
    }
})

// request拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 是否需要设置 token
        let isToken = (config!.headers || {}).isToken === false
        whiteList.some((v) => {
            if (config.url && config.url.indexOf(v) > -1) {
                return (isToken = false)
            }
        })
        config.headers['tenant-id'] = 1
        const method = config.method?.toUpperCase()
        // 防止 GET 请求缓存
        if (method === 'GET') {
            config.headers['Cache-Control'] = 'no-cache'
            config.headers['Pragma'] = 'no-cache'
        }
        // 自定义参数序列化函数
        else if (method === 'POST') {
            const contentType = config.headers['Content-Type'] || config.headers['content-type']
            if (contentType === 'application/x-www-form-urlencoded') {
                if (config.data && typeof config.data !== 'string') {
                    config.data = qs.stringify(config.data)
                }
            }
        }
        return config
    },
    (error: AxiosError) => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    async (response: AxiosResponse<any>) => {
        let { data } = response
        const config = response.config

        if (!data) {
            throw new Error()
        }

        // 二进制数据则直接返回
        if (
            response.request.responseType === 'blob' ||
            response.request.responseType === 'arraybuffer'
        ) {
            if (response.data.type !== 'application/json') {
                return response.data
            }
            data = await new Response(response.data).json()
        }

        const code = data.code || result_code
        const msg = data.msg || errorCode[code] || errorCode['default']

        if (ignoreMsgs.indexOf(msg) !== -1) {
            return Promise.reject(msg)
        }  else if (code === 500) {
            message.error('服务器错误,请联系管理员!')
            return Promise.reject(new Error(msg))
        } else {
            return data
        }
    },
    (error: AxiosError) => {
        console.log('err' + error)
        let { message: errorMsg } = error
        const { t } = useI18n()

        if (errorMsg === 'Network Error') {
            errorMsg = '操作失败,系统异常!'
        } else if (errorMsg.includes('timeout')) {
            errorMsg = '接口请求超时,请刷新页面重试!'
        } else if (errorMsg.includes('Request failed with status code')) {
            errorMsg = '请求出错，请稍候重试' + errorMsg.substr(errorMsg.length - 3)
        }

        message.error(errorMsg)
        return Promise.reject(error)
    }
)


export { service }