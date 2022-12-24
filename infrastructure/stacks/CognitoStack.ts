import {Stack} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {UserPool, VerificationEmailStyle} from 'aws-cdk-lib/aws-cognito'

export class CognitoStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id)
    const userPool = new UserPool(this, id + '-userpool', {
      userPoolName: id + '-userpool',
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Please verify your account',
        emailBody: 'Thanks for signing up to our awesome app! Your verification code is {####}',
        emailStyle: VerificationEmailStyle.CODE,
      },
      signInAliases: {
        username: true,
        email: true
      }
    })
    const client = userPool.addClient('test-client', {
      authFlows: {
        userPassword: true
      },
      generateSecret: true
    })
    console.log(client.userPoolClientSecret)
  }
}