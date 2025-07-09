import { OAUTH_NAME } from '@/constants'
import { AuthClient } from 'payload-auth-plugin/client'

export const appAuthClient = new AuthClient(OAUTH_NAME)
