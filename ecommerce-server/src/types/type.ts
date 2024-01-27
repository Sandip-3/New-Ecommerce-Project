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
  userId?: string;
  orderId?: string;
  productId?: string | string[];
};

export type OrderItemType = {
  name: string;
  photo: string;
  quantity: number;
  price: number;
  productId: string;
};
export type ShippingInfoType = {
  address: string;
  city: string;
  country: string;
  state: string;
  pinCode: number;
};

export type OrderRequestBody = {
  shippingInfo: ShippingInfoType;
  user: string;
  subTotal: number;
  tax: Number;
  discount: Number;
  shippingCharge: Number;
  total: Number;
  orderItems: OrderItemType[];
};
