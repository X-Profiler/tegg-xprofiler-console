export interface User {
  id: number;
  name: string;
  nick: string;
  pass: string;
  identity: string;
  mail: string;
}

export interface UserData extends Omit<User, 'id' | 'pass' | 'identity'> {
  userId: number;
}

export interface InsertResults {
  insertId: number;
}
