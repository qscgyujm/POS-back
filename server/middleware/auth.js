import jwt from 'jsonwebtoken';


export default async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    res.sendStatus(401).send('no token');
    return;
  }

  const isLogin = await jwt.verify(token, process.env.APP_KEY);

  if (!isLogin) {
    res.sendStatus(410);
    return;
  }

  req.userId = isLogin.userId;
  next();
};
