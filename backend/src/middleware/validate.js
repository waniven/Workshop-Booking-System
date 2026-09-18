// middleware/validate.js

const validate = (schema) => (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      error: "Validation failed",
      details: [
        {
          field: "body",
          message: "Request body is completely missing.",
        },
      ],
    });
  }

  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errorMessages = (
      result.error.issues ||
      result.error.errors ||
      []
    ).map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      error: "Validation failed",
      details: errorMessages,
    });
  }

  req.body = result.data;
  next();
};

module.exports = validate;
