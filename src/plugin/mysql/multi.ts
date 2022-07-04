import { Mysql } from './index';


export default class MultiClients {
  private clients: Map<string, Mysql> = new Map();

  get(key: string): Mysql {
    const mysql = this.clients.get(key);
    if (!mysql) {
      throw new Error(`Mysql client with key ${key} not found, please check your config.`);
    }
    return mysql;
  }

  set(key: string, mysql: Mysql): void {
    this.clients.set(key, mysql);
  }

  values(): Mysql[] {
    const clients: Mysql[] = [];
    for (const mysql of this.clients.values()) {
      clients.push(mysql);
    }
    return clients;
  }

  clean(): void {
    this.values().forEach(client => client.end());
    this.clients.clear();
  }
}
