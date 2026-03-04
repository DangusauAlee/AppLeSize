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
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  // Other modals can be added
};
