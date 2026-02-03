import request from '@/config/axios'

export const TimeLineIntroductionApi = {

    searchTimeLineData: async () => {
        return await request.get({ url: `/website/timeline-introduction/searchTimeLineData` })
    },
}