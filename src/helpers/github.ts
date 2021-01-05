import axios from 'axios'
import { Alert } from 'react-native'
import { authorize as appAuthAuthorize } from 'react-native-app-auth'

let accessToken: string

const githubApi = axios.create({
  baseURL: 'https://api.github.com'
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
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: 'https://github.com/settings/connections/applications/<client-id>'
      }
    })

    accessToken = authState.accessToken
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

type Bill = {
  name: string
  expireDay: number
  paid: boolean
}

export type BillGroup = {
  id: string // yyyy-mm = 2020-12
  bills: Bill[]
}

type Template = Omit<Bill, 'paid'>

type BillsResponse = {
  billGroups: BillGroup[]
  templates: Template[]
}

export async function fetchBillGroups(gistId: string): Promise<BillGroup[]> {
  const { data: gist } = await githubApi.get<Gist>(`/gists/${gistId}`)
  const billsUrl = gist.files['bills.json'].raw_url
  let { data: billsResponse } = await githubApi.get<BillsResponse>(billsUrl)
  const { billGroups } = billsResponse

  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()
  const currentBillGroupId = `${currentYear}-${currentMonth}`
  const currentBillGroup = billGroups.find(billGroup => billGroup.id === currentBillGroupId)

  if (!currentBillGroup) {
    const { billGroups: newBillGroups } = await createBillGroup(
      gistId,
      currentBillGroupId,
      billsResponse
    )

    return newBillGroups
  }

  return billGroups
}

export async function createBillGroup(
  gistId: string,
  billGroupId: string,
  billsResponse: BillsResponse
): Promise<BillsResponse> {
  const { billGroups, templates } = billsResponse
  const newBillsResponse: BillsResponse = {
    ...billsResponse,
    billGroups: [
      ...billGroups,
      {
        id: billGroupId,
        bills: templates.map<Bill>((template: Template) => ({ ...template, paid: false }))
      }
    ]
  }

  await githubApi.patch(`/gists/${gistId}`, {
    files: {
      'bills.json': {
        content: JSON.stringify(newBillsResponse, null, 2)
      }
    }
  })

  return newBillsResponse
}
