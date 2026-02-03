import request from '@/config/axios'

export const TeamIntroductionApi = {

    searchTeamPersons: async () => {
        return await request.get({ url: `/website/team-introduction/searchTeamPersons` })
    },
}