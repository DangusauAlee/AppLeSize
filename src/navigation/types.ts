export type RootTabParamList = {
  Feed: undefined;
  Swaps: undefined;
  Urgent: undefined;
  Shops: undefined;
  Profile: undefined;
};

export type FeedStackParamList = {
  FeedMain: undefined;
  ProductDetail: { productId: string };
  DemandDetail: { demandId: string };
  CreateProduct: undefined;
  CreateDemand: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: { email: string; type: 'signup' | 'recovery' };
  SetNewPassword: { email: string };
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
