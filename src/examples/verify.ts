import cognitoJson from '../../cognito.json'
import { CognitoService } from '../CognitoService'

async function verify() {

  if (!process.argv[2]) {
    console.error('provide username')
    process.exit(1)
  }

  if (!process.argv[3]) {
    console.error('provide code')
    process.exit(1)
  }

  const cognitoService = new CognitoService(cognitoJson.client_id, cognitoJson.user_pool_id, cognitoJson.secret, cognitoJson.region)

  try {
    await cognitoService.verifyCode(process.argv[2], process.argv[3])
  } catch (e) {
    console.error(e)
  }
}

verify()