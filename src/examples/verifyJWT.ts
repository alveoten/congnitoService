import { CognitoService } from '../CognitoService'
import cognitoJson from '../../cognito.json'

(async () => {
  if (!process.argv[2]) {
    console.error('provide a token')
    process.exit(1)
  }
  const cognitoService = new CognitoService(cognitoJson.client_id, cognitoJson.user_pool_id, cognitoJson.secret, cognitoJson.region)
  try {
    const res = await cognitoService.verifyJWT(process.argv[2])
    console.log('Token is valid. Payload: ', res)
  } catch (e) {
    console.log('Token not valid!')
    console.error(e)
  }
})()