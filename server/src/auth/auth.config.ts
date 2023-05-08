import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as jwkToPem from 'jwk-to-pem';

@Injectable()
export class AuthConfig {
  public userPoolId: string = process.env.COGNITO_USER_POOL_ID;
  public clientId: string = process.env.COGNITO_CLIENT_ID;
  public region: string = process.env.COGNITO_REGION;
  public authority = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
  public jwtPublicKey: string;

  constructor() {
    this.fetchPublicKey();
  }

  async fetchPublicKey() {
    try {
      const jwksUrl = `${this.authority}/.well-known/jwks.json`;
      const response = await axios.get(jwksUrl);
      const jwks = response.data.keys;
      const publicKey = jwks[0];

      this.jwtPublicKey = jwkToPem(publicKey);
    } catch (error) {
      console.error(`Error fetching public key: ${error.message}`);
    }
  }
}
