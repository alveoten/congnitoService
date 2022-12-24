import cognitoJson from '../../cognito.json'
import { CognitoService } from '../CognitoService'

async function signUp() {
  if (!process.argv[2]) {
    console.error('provide username')
    process.exit(1)
  }

  if (!process.argv[3]) {
    console.error('provide email')
    process.exit(1)
  }

  if (!process.argv[4]) {
    console.error('provide password')
    process.exit(1)
  }

  const cognitoService = new CognitoService(cognitoJson.client_id, cognitoJson.user_pool_id, cognitoJson.secret, cognitoJson.region)

  try {
    await cognitoService.signUp(process.argv[2], process.argv[3], process.argv[4])
  } catch (e) {
    console.error(e)
  }
}

(async () => await signUp())()