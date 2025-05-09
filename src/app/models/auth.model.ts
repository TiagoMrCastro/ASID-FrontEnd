export interface RegisterRequest {
  username: string;
  email: string;
  fullname: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  token: string;
}
