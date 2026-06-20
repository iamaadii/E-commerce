import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const {token} = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const decode_token = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode_token);

    req.body.userId = decode_token.id;

    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
