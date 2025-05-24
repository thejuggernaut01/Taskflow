export type LoginProps = {
  email: string;
  password: string;
};

export type SignupProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ApiResponse = {
  status: string;
  message: string;
  error?: {
    [key: string]: string[];
  };
  response: {
    [key: string]: {
      [x: string]: string;
    };
  };
};
