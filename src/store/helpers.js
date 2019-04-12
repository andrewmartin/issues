// a simple helper to parse axios data shape for error response object;
// might want to add more sophisticated logic here to parse error codes and return other data or messaging
export const parseError = error => {
  if (error.response && error.response.data) return error.response.data;

  return {
    message: 'There was an error',
  };
};

export default {
  parseError,
};
