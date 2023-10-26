export type SessionToken = {
  value: string;
  expiresIn: number;
  expirationDate: number;
};

export enum AccountType {
  BASIC = 'basic',
  UPGRADED = 'upgraded'
}
