import cognitoJson from '../../cognito.json'
import { CognitoService } from '../CognitoService'

async function changePassword() {
  if (!process.argv[2]) {
    console.error('provide old password')
    process.exit(1)
  }

  if (!process.argv[3]) {
    console.error('provide new password')
    process.exit(1)
  }

  if (!process.argv[4]) {
    console.error('provide token')
    process.exit(1)
  }

  const cognitoService = new CognitoService(cognitoJson.client_id, cognitoJson.user_pool_id, cognitoJson.secret, cognitoJson.region)

  try {
    await cognitoService.changePassword(process.argv[2], process.argv[3], process.argv[4])
  } catch (e) {
    console.error(e)
  }
}

(async () => await changePassword())()