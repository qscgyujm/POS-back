import jwt from 'jsonwebtoken';


export default async (req, res, next) => {
  const token = req.get('token');

  if (!token) {
    res.sendStatus(401);
  }

  const isLogin = await jwt.verify(token, process.env.APP_KEY);

  if (isLogin) {
    next();
  }

  res.sendStatus(401);
};
