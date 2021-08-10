import jwt from 'jsonwebtoken';

// defines the payload of the user
interface UserPayload {
  id: string,
  email: string;
  role: string;
  token: string;
}

const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserPayload;
    payload.token = token;
    return payload;
  } catch (err) { }
}

export { verifyToken, UserPayload }