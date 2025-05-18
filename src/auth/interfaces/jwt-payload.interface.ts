export interface JwtPayload {
  sub:string;
  email: string;
  role: string;
  lat?: number;
  exp?: number;
}