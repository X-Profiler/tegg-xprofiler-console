import { Injectable, ScopeEnum } from '@xprofiler/tegg';
import { UserData } from './type';

@Injectable({ scope: ScopeEnum.EXECUTION })
export default class User {
  private user: UserData;

  set(user: UserData) {
    this.user = user;
  }

  get userId(): number {
    return this.user?.userId;
  }

  get nick(): string {
    return this.user?.nick;
  }
}
