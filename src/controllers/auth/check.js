import { HttpException } from "../../libs/errors";

const check = async (req, res, next) => {
  try {
    res.json({ status: true, user: req.user.cleanObject() });
  } catch (error) {
    next(new HttpException(500, error.message));
  }
};

export default check;
