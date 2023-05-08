import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthConfig } from '../auth/auth.config';

@Injectable()
export class UsersService {
  private cognitoIdentityServiceProvider: CognitoIdentityServiceProvider;

  constructor(private readonly authConfig: AuthConfig) {
    this.cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
      region: this.authConfig.region,
    });
  }

  async getAllUsers(): Promise<any> {
    const params = {
      UserPoolId: this.authConfig.userPoolId,
      Limit: 10, // Adjust the limit as needed
    };

    try {
      const result = await this.cognitoIdentityServiceProvider
        .listUsers(params)
        .promise();
      return result.Users;
    } catch (error) {
      throw new Error(`Failed to list users: ${error.message}`);
    }
  }
}
