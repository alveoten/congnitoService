import cognitoJson from '../../cognito.json'
import { CognitoService } from '../CognitoService'

async function signIn() {
  const cognitoService = new CognitoService(cognitoJson.client_id, cognitoJson.user_pool_id, cognitoJson.secret, cognitoJson.region)
  try {
    if (!process.argv[2]) {
      console.error('provide username')
      process.exit(1)
    }

    if (!process.argv[3]) {
      console.error('provide password')
      process.exit(1)
    }

    const res = await cognitoService.signIn(process.argv[2], process.argv[3])

    console.log(res)
  } catch (e) {
    console.error(e)
  }
}

(async () => await signIn())()