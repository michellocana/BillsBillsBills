type Gist = {
  files: {
    [key: string]: {
      filename: string
      raw_url: string
    }
  }
}

type Bill = {
  id: string
  name: string
  expireDay: number
  isPaid: boolean
  isPastPaymentTerm: boolean
}

type BillGroup = {
  id: string // yyyy-mm = 2020-12
  bills: Bill[]
}

type Template = Omit<Bill, 'isPaid'>

type BillsResponse = {
  billGroups: BillGroup[]
  templates: Template[]
}
