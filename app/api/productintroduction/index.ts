import request from '@/config/axios'

export const ProductIntroductionApi = {

    searchProductData: async () => {
        return await request.get({ url: `/website/product-introduction/searchProductData` })
    },
}