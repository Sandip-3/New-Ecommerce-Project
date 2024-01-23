export interface NewUserRequestBody {
  name: string;
  photo: string;
  _id: string;
  email: string;
  role: string;
  dob: Date;
  age: number;
}

export interface NewProductRequestBody {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}
