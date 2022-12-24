export interface CognitoJwtFields {
    token_use: 'access' | 'id';
    'cognito:groups'?: string[];
    sub: string;
    iss: string;
    exp: number;
    iat: number;
    auth_time: number;
    jti: string;
    origin_jti: string;
}