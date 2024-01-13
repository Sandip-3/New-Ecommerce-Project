import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
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

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
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

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
