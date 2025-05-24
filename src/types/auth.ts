
export type LoginProps = {
  email: string;
  password: string;
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
