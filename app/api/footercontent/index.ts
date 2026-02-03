import request from '@/config/axios'

export const FooterContentApi = {

    searchAllInfos: async () => {
        return await request.get({ url: `/website/footer-content/searchAllInfos` })
    },
}