import React, { ReactNode, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '@env'

import { authorize } from '../helpers/github'
import { COLOR_GREEN_1, COLOR_WHITE } from '../constants/colors'

type AuthProviderProps = {
  children: ReactNode
}

export const AUTH_CONTEXT_INITIAL_STATE = {
  accessToken: ''
}

export const AuthContext = React.createContext(AUTH_CONTEXT_INITIAL_STATE)

const s = StyleSheet.create({
  spinner: {
    height: '100%',
    justifyContent: 'center'
  }
})

export default function AuthProvider(props: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string>('')
  const context = { accessToken }

  useEffect(() => {
    async function tryToAuthorize() {
      const authState = await authorize(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)

      if (authState?.accessToken) {
        setAccessToken(authState.accessToken)
      }
    }

    tryToAuthorize()
  }, [])

  if (!accessToken) {
    return (
      <View style={s.spinner}>
        <ActivityIndicator size='large' color={COLOR_GREEN_1} />
      </View>
    )
  }

  return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
}
