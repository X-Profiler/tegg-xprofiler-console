import {
  Application, LifecycleHookUnit,
  ApplicationLifecycle, LifecycleHook, WithApplication, WithContainer,
  Container,
} from '@xprofiler/tegg';
import { MysqlOptions } from './type';
import { Mysql, MultiMysqlClients } from './index';

@LifecycleHookUnit()
export default class RedisInitialization implements ApplicationLifecycle {
  private app: Application;
  private container: Container;

  constructor(@WithApplication() app: Application, @WithContainer() conainer: Container) {
    this.app = app;
    this.container = conainer;
  }

  @LifecycleHook()
  async didLoad() {
    const config = this.app.config.mysql;
    const client: MysqlOptions = config.client;
    const clients: Record<string, MysqlOptions> = config.clients;

    if (client.user && client.database) {
      this.container.set({ id: Mysql, value: new Mysql(client) });
    }

    if (clients) {
      const multiClients = new MultiMysqlClients();
      Object
        .entries(clients)
        .forEach(([ key, options ]) => multiClients.set(key, new Mysql(options)));
      this.container.set({ id: MultiMysqlClients, value: multiClients });
    }
  }

  @LifecycleHook()
  async beforeClose() {
    try {
      this.container.get(Mysql).end();
      this.container.get(MultiMysqlClients).clean();
    } catch (e) { e; }
  }
}
