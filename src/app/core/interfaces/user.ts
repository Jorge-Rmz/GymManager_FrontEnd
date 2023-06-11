export interface SignUp{
  id?:string
  email:string,
  password?:string,
  phoneNumber: string,
}
export interface SignIn{
  email:string,
  password:string,
}
export interface Login{
  userName:string,
  password:string,
  phoneNumber?:string,
}

export interface User{
  id?: string;
  userName:string,
  phoneNumber: string,
}


export interface UserResponse {
  hasError:  boolean;
  message:   string;
  model:     User[];
  requestId: string;
}

export interface ResponseModelLogin {
    hasError:  boolean;
    message:   string;
    model:     Model;
    requestId: string;
}

export interface Model {
  title?: string;
  accessToken?: string;
}

export interface ResponseModelSignUp{
  hasError:  boolean;
  message:   string;
  model:     Model[];
  requestId: string;
}

export interface Model {
  code:        string;
  description: string;
}


