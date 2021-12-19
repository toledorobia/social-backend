import { User } from "../../models";
import { HttpException } from "../../libs/errors";

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new HttpException(401, "User not found");
    }

    const { name, avatar } = req.body;
    user.name = name;
    if (avatar) {
      user.avatar = avatar;
    }

    user.save();
    
    res.json(user.cleanObject());
  } catch (error) {
    next(error);
  }
};

export default updateProfile;
