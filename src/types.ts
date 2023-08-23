export interface Pet {
  id: string;
  name: string;
  description: string;
  age: number;
  type: PetType;
  adopted: boolean;
  photoLink: string;
}

export enum PetType {
  Cat = "CAT",
  Dog = "DOG",
}

export interface User {
  userName: string;
  password: string;
  role: Role;
}

type Role = "CUSTOMER" | "ADMIN" | null;
