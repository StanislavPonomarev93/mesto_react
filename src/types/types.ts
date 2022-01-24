export type CardType = {
  name: string;
  link: string;
  likes: [{
    _id: ''
  }];
  owner: {
    _id: ''
  }
  _id: string;
}
export type LikeObject = {
  id: string;
  arr: [];
  likeActive: boolean;
}
export type LoginType = {
  login: string;
  password: string;
}
export type RegisterType = {
  login: string;
  email: string;
  password: string;
  replayPassword: string;
}
export type UserType = {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export type ApiData = {
  baseUrl: string;
  BASE_URL: string;
  token: {
    headers: {
      authorization: string;
    };
  }; headers: {
    authorization: string;
    'Content-Type': string;
  };
}