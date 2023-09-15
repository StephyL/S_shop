const notFound = (req, res, next) => {
  const error = new Error(`NOT FOUND - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? "You are in production environment."
        : err.stack,
  });
};

export { notFound, errorHandler };
