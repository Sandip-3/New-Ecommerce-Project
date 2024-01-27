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

export type SearchData = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export type BaseQuery = {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
};

export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
};
