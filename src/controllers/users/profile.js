import { User } from "../../models";
import { HttpException } from "../../libs/errors";

const profile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new HttpException(401, "User not found");
    }
    
    res.json(user.cleanObject());
  } catch (error) {
    next(error);
  }
};

export default profile;
