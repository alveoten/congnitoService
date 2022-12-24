import cognitoJson from '../../cognito.json'
import { CognitoService } from '../CognitoService'

async function revokeToken() {
  if (!process.argv[2]) {
    console.error('provide token')
    process.exit(1)
  }

  const cognitoService = new CognitoService(cognitoJson.client_id, cognitoJson.user_pool_id, cognitoJson.secret, cognitoJson.region)

  try {
    await cognitoService.revokeToken(process.argv[2])
  } catch (e) {
    console.error(e)
  }
}

(async () => await revokeToken())()