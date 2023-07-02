type UserType1 = {
  email: string;
};

type UserType2 = {
  eamil?: string;
};

type UserType3 = {
  [key in keyof UserType1]?: string;
};

type UserType4 = Partial<UserType1>;

type UserType5 = Readonly<UserType1>;
