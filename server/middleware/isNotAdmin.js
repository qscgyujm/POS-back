export default async (req, res, next) => {
  const { userId } = req;

  try {
    if (userId === 1) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
