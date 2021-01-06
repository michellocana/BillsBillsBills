import axios from 'axios'
import dayjs from 'dayjs'
import { Alert } from 'react-native'
import { authorize as appAuthAuthorize } from 'react-native-app-auth'

import {
  GITHUB_ACCESS_TOKEN_URL,
  GITHUB_API_URL,
  GITHUB_AUTHORIZATION_URL,
  GITHUB_REVOCATION_URL
} from '../constants/url'

let accessToken: string

const githubApi = axios.create({
  baseURL: GITHUB_API_URL
})

githubApi.interceptors.request.use(config => {
  config.headers['Authorization'] = `token ${accessToken}`
  return config
})

export async function authorize(clientId: string, clientSecret: string) {
  try {
    const authState = await appAuthAuthorize({
      clientId,
      clientSecret,
      redirectUrl: 'com.billstopay://oauthredirect',
      scopes: ['identity', 'gist'],
      serviceConfiguration: {
        authorizationEndpoint: GITHUB_AUTHORIZATION_URL,
        tokenEndpoint: GITHUB_ACCESS_TOKEN_URL,
        revocationEndpoint: GITHUB_REVOCATION_URL
      }
    })

    accessToken = authState.accessToken

    return authState
  } catch (e) {
    console.log(e)

    Alert.alert('Unable to auth with GitHub')
  }
}

type Gist = {
  files: {
    [key: string]: {
      filename: string
      raw_url: string
    }
  }
}

export type Bill = {
  id: string
  name: string
  expireDay: number
  isPaid: boolean
}

export type BillGroup = {
  id: string // yyyy-mm = 2020-12
  bills: Bill[]
}

type Template = Omit<Bill, 'isPaid'>

export type BillsResponse = {
  billGroups: BillGroup[]
  templates: Template[]
}

export async function fetchBills(gistId: string): Promise<BillsResponse> {
  const { data: gist } = await githubApi.get<Gist>(`/gists/${gistId}`)
  const billsUrl = gist.files['bills.json'].raw_url
  let { data: billsResponse } = await githubApi.get<BillsResponse>(billsUrl)
  const { billGroups } = billsResponse

  const today = dayjs()
  const currentBillGroupId = today.format('YYYY-MM')
  const currentBillGroup = billGroups.find(billGroup => billGroup.id === currentBillGroupId)

  if (!currentBillGroup) {
    return {
      ...billsResponse,
      billGroups: await createBillGroup(gistId, currentBillGroupId, billsResponse)
    }
  }

  return billsResponse
}

export async function createBillGroup(
  gistId: string,
  billGroupId: string,
  billsResponse: BillsResponse
): Promise<BillGroup[]> {
  const { billGroups, templates } = billsResponse
  const newBillsResponse: BillsResponse = {
    ...billsResponse,
    billGroups: [
      ...billGroups,
      {
        id: billGroupId,
        bills: templates
          .sort((templateA, templateB) => (templateA.expireDay < templateB.expireDay ? -1 : 1))
          .map<Bill>((template: Template) => ({ ...template, isPaid: false }))
      }
    ]
  }

  await updateBillGroups(gistId, newBillsResponse)

  return newBillsResponse.billGroups
}

export async function updateBillGroups(gistId: string, billsResponse: BillsResponse) {
  const billsContent: BillsResponse = {
    ...billsResponse,
    billGroups: billsResponse.billGroups.sort((billGroupA, billGroupB) =>
      billGroupA.id > billGroupB.id ? -1 : 1
    )
  }

  await githubApi.patch(`/gists/${gistId}`, {
    files: {
      'bills.json': {
        content: JSON.stringify(billsContent, null, 2)
      }
    }
  })
}
