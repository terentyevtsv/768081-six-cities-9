import { AuthorizationStatus } from '../../const';
import { changeAuthorizationStatus, userProcess } from './user-process';

describe('Reducer: userProcess', () => {
  it('should change authorization status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    expect(userProcess.reducer(
      state,
      changeAuthorizationStatus(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });
});
