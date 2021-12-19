import { removeRefreshToken } from "../../libs/tokens";

const signOut = async (req, res, next) => {
  try {
    removeRefreshToken(res);
    res.json({
      message: "You have been signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default signOut;
