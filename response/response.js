const {
  STATUS_CODES,
  RESPONSE_STATUS,
  // ROLES,
  // OTP_EXPIRE_TIME,
} = require("../constants/common.constant");


const sendSuccess = (
  res,
  message,
  statusCode = STATUS_CODES.SUCCESS,
  data = null,
  pagination = null
) => {
  const response = {
    message,
    status: RESPONSE_STATUS.SUCCESS,
  };

  if (data) response.data = data;
  if (pagination) response.pagination = pagination;

  return res.status(statusCode).json(response);
};

const sendFail = (
  res,
  message,
  statusCode = STATUS_CODES.UNAUTHORIZED
) => {
  return res.status(statusCode).json({
    message,
    status: RESPONSE_STATUS.FAIL,
    data: null,
  });
};

module.exports = {
  sendSuccess,
  sendFail,
};
