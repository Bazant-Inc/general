interface User {
  id: string; // PK, UUID
  email: string; // UQ
  hash: string;
}

type RegisterUserDto = Pick<User, "email"> & {
  password: string;
};

type ReturnUserDto = Omit<User, "hash">;
