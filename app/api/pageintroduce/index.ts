import request from '@/config/axios'

export const PageintroduceApi = {

    searchByType: async (params: any) => {
        return await request.get({ url: `/website/page-introduce/searchByType`, params })
    },
}