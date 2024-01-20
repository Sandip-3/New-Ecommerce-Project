import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import Header from "./components/Header";
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Transaction = lazy(() => import("./pages/Admin/Transaction"));
const Customers = lazy(() => import("./pages/Admin/Customers"));
const Products = lazy(() => import("./pages/Admin/Products"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Product = lazy(() => import("./pages/Admin/Product"));
const ManageProduct = lazy(() => import("./pages/Admin/ManageProduct"));
const TransactionManage = lazy(() => import("./pages/Admin/TransactionManage"));
const Barchart = lazy(() => import("./pages/Admin/Barcharts"));
const Linechart = lazy(() => import("./pages/Admin/Linechart"));
const Piechart = lazy(() => import("./pages/Admin/Piechart"));
const Login = lazy(() => import("./pages/Login"));

const user = {
  name: "",
  email: "sandy@gmail.com",
  address: "Sankhamul",
  isAdmin: false,
};

const App = () => {
  return (
    <>
      <Header user={user} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          {/* Not Logged In Route */}
          <Route path="/login" element={<Login />} />
          {/* Login User Route */}
          {/* Shipping , Orders ,Order Details */}

          {/* Admin Routes */}
          <Route>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/product/new" element={<Product />} />
            <Route path="/admin/product/:id" element={<ManageProduct />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManage />}
            />
            <Route path="/admin/barchart" element={<Barchart />} />
            <Route path="/admin/linechart" element={<Linechart />} />
            <Route path="/admin/piechart" element={<Piechart />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
