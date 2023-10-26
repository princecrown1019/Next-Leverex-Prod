export enum AuthEidStatus {
  // Waiting for scanned QR (deprecated):
  NOT_SCANNED = 'WAITING_LOCAL_ACK',

  // Waiting for signature in the mobile app:
  NOT_READY = 'NOT_READY',

  // Success:
  SUCCESS = 'SUCCESS',

  // Auth eID Errors:
  TIMEOUT = 'TIMEOUT',
  CANCELLED = 'USER_CANCELLED',
  ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED'

  // Ignored Auth eID Errors:
  // RP_CANCELLED = 'RP_CANCELLED',
}
