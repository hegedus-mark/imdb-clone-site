export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // Development error response
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.formError && { formError: err.formError }),
      stack: err.stack
    });
    return;
  }

  // Production error response
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.formError && { formError: err.formError })
    });
  } else {
    // Programming or unknown errors
    console.error('ERROR 💥', err);
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
};