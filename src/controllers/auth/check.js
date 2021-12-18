import { httpError } from "../../utils/errors";

const check = async (req, res, next) => {
  try {
    const { deleted, password, ...user } = req.user.toObject();
    res.json({ status: true, user });
  } catch (error) {
    next(httpError(401, error.message));
  }
};

export default check;
