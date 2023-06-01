import { SalesforceDAO } from '../salesforce.dao';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthDTO } from '../../auth/dto/auth.dto';

// Mock the jsforce library
jest.mock('jsforce', () => {
  return {
    Connection: jest.fn().mockImplementation(() => ({
      oauth2: {
        loginUrl: 'https://login.salesforce.com',
        clientId: 'mockClientId',
        clientSecret: 'mockClientSecret',
        redirectUri: 'mockRedirectUri',
      },
      on: jest.fn(),
      apex: {
        post: jest.fn(),
      },
      query: jest.fn(),
    })),
    OAuth2: jest.fn().mockImplementation(() => ({
      loginUrl: 'https://login.salesforce.com',
      clientId: 'mockClientId',
      clientSecret: 'mockClientSecret',
      redirectUri: 'mockRedirectUri',
    })),
  };
});

describe('SalesforceDAO', () => {
  let salesforcedao: SalesforceDAO;

  const mockedAuthDAO = {
    getTokensByOrgId: jest.fn(),
  };

  const mockedAuthService = {
    updateToken: jest.fn(),
  };

  const authDTO = new AuthDTO(null, null, null);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SalesforceDAO, AuthService, AuthDAO],
    })
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(AuthService)
      .useValue(mockedAuthService)
      .compile();

    salesforcedao = moduleRef.get<SalesforceDAO>(SalesforceDAO);
  });

  describe('getJobs', () => {
    it('should throw an error if the tableId is error', async () => {
      await expect(salesforcedao.getJobs('error', null)).rejects.toThrow(
        'Not Found',
      );
    });
  });
});
