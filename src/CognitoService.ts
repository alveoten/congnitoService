import * as AWS from 'aws-sdk'
import {createHmac} from 'node:crypto'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import {CognitoJwtFields} from './models/CognitoJwtFields'

export class CognitoService {
  constructor(private clientId: string, private poolId: string, private secret: string, private region: string) {}

  public async signIn(username: string, password: string)
  : Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
    try {
      const res = await this.getClient().initiateAuth(
        {
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: this.clientId,
          AuthParameters: {
            'USERNAME': username,
            'PASSWORD': password,
            'SECRET_HASH': this.getSecret(username)
          }
        }
      ).promise()
      if (!res.AuthenticationResult && !res.ChallengeName) {
        throw new Error('undefined response from cognito')
      }
      return res
    } catch (error) {
      console.log(error)
      throw error
    }    
  }

  public async challengeNewPassword(username: string, password: string, session: string)
  : Promise<AWS.CognitoIdentityServiceProvider.Types.RespondToAuthChallengeResponse> {
    try {
      const res = await this.getClient().respondToAuthChallenge({
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ClientId: this.clientId,
        ChallengeResponses: {
          'USERNAME': username,
          'NEW_PASSWORD': password,
          'SECRET_HASH': this.getSecret(username)
        },
        Session: session
      }).promise()
      return res
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  public async signUp(username: string, email: string, password: string) {
    await this.getClient().signUp(
      {
        ClientId: this.clientId,
        Password: password,
        Username: username,
        UserAttributes: [
          {
            Name: 'email',
            Value: email
          }
        ],
        SecretHash: this.getSecret(username)
      }
    ).promise()
  }

  public async verifyCode(username: string, code: string) {
    await this.getClient().confirmSignUp(
      {
        ClientId: this.clientId,
        Username: username,
        ConfirmationCode: code,
        SecretHash: this.getSecret(username)
      }
    ).promise()  
  }

  public async verifyJWT(token: string): Promise<CognitoJwtFields> {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.poolId,
      tokenUse: 'access',
      clientId: this.clientId
    })
    
    return await verifier.verify(token)    
  }

  public async revokeToken(token: string) {
    await this.getClient().revokeToken({
      Token: token,
      ClientId: this.clientId,
      ClientSecret: this.secret
    }).promise()
  }

  public async changePassword(oldPassword: string, newPassword: string, token: string) {
    await this.getClient().changePassword({
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
      AccessToken: token
    }).promise()
  }

  private getClient(): AWS.CognitoIdentityServiceProvider {
    return new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-19',
      region: this.region
    })
  }

  private getSecret(username: string): string {
    return createHmac('sha256', this.secret).update(username + this.clientId).digest('base64')
  }
}