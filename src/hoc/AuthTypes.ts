export interface IUser {
  token?: string;
  ui?: string;
  expired?: string;
  logged?: boolean;
  exp?: string;
}

export interface IContext extends IUser {
  authenticate: (
    email: string,
    password: string,
  ) => Promise<"success" | "error">;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
