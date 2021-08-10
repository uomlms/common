import jwt from 'jsonwebtoken';

// defines the payload of the user
interface UserPayload {
  id: string,
  email: string;
  role: string;
}

const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserPayload;
    return payload;
  } catch (err) { }
}

export { verifyToken, UserPayload }