const OTP_EXPIRE_TIME = Object.freeze({
  CONTACT: 2 * 60 * 1000,
});

const RESPONSE_STATUS = Object.freeze({
  SUCCESS: "Success",
  FAIL: "Fail",
});

const ROLES = Object.freeze({
  ADMIN: "Admin",
  USER: "User",
});

const STATUS_CODES = Object.freeze({
  // 2xx — Success
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 3xx — Redirect
  NOT_MODIFIED: 304,

  // 4xx — Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  GONE: 410,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,

  // 5xx — Server Errors
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // Custom API Codes
  CUSTOM_FAIL: 498,
});

module.exports = {
  OTP_EXPIRE_TIME,
  RESPONSE_STATUS,
  ROLES,
  STATUS_CODES,
};
