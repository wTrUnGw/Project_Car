import React, { useEffect, useRef } from "react";
import product from "../../../apis/product";
import data from "./data.json";
import ProductList from "./ProductList";
import { useState } from "react";
import toast from "react-hot-toast";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import useCarApi from "../../../components/Admin/apis/useCarAPI";
import axios from "axios";

export default function ShoeShop() {
  // const [cars, setCars] = useState([]);
  // const { addCar, fetchCars } = useProductApi();
  // state quản lý giá trị sản phẩm đang được chọn để xem chi tiết
  const [selectedProduct, setselectedProduct] = useState(null);

  //modal - state quản lý trạng thái ẩn hiện của modal giỏ hàng
  const [isOpen, setIsOpen] = useState(false);

  //modal - state quản lý trạng thái ẩn hiện của Detail
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  //modal - state quán lý form
  const [isOpenForm, setIsOpenForm] = useState(false);

  // state quản lý sản phẩm trong giỏ hàng
  const [carts, setCarts] = useState([]);

  // tổng số hàng
  const totalProduct = carts.reduce((result, item) => {
    return result + item.soLuong;
  }, 0);

  // hàm thêm sản phẩm vào Cart
  const handleAddToCart = (product) => {
    // kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const found = carts.find((item) => item.id === product.id);
    if (found) {
      // Sản phẩm đã tồn tại trong giỏ hàng
      const newCarts = carts.map((item) => {
        if (item.id === product.id) {
          return { ...item, soLuong: item.soLuong + 1 };
        }
        return item;
      });

      setCarts(newCarts);
    } else {
      // sản phẩm chưa tồn tại trong giỏ hàng
      const productWithQuantiTy = { ...product, soLuong: 1 };
      setCarts([...carts, productWithQuantiTy]);
    }
    console.log(carts);
  };

  // hàm xóa sản phẩm
  const handleDeleteProductFromCart = (productID) => {
    const newCarts = carts.filter((item) => item.id !== productID);
    setCarts(newCarts);
  };

  // hàm thay đổi số lượng của sản phẩm
  const handleChangeQuantityFromCart = (productID, tangGiam) => {
    var gioHangCapNhat = [...carts];
    let index = gioHangCapNhat.findIndex((sp) => sp.id === productID);

    if (tangGiam) {
      gioHangCapNhat[index].soLuong += 1;
    } else {
      if (gioHangCapNhat[index].soLuong > 1) {
        gioHangCapNhat[index].soLuong -= 1;
      }
    }
    setCarts(gioHangCapNhat);
  };

  const [posts, setPosts] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  // đóng giỏ hàng
  const handleCloseCart = () => {
    setIsOpen(false);
  };

  // hàm đóng chi tiết
  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  // hàm mở chi tiết
  const handleOpenDetail = () => {
    setIsOpenDetail(true);
  };

  // hàm lựa sản phẩm để xem chi tiết
  const handleGetProduct = (product) => {
    setselectedProduct(product);
  };

  useEffect(() => {
    axios.get("data").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="container ">
        <select value={selectedItem} onChange={(evt) => setSelectedItem(evt.target.value)}>
          <option value="">All</option>
          <option value={1}>Hyundai</option>
          <option value={2}>Thaco</option>
        </select>
        <h1 className="text-center text-primary pt-5">LUXURY CAR</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger mb-4 " onClick={() => setIsOpen(true)}>
            <i class="fa fa-paper-plane"></i> Lịch đặt xe ({totalProduct})
          </button>
        </div>
        <ProductList
          onGetProduct={handleGetProduct}
          products={data}
          onAddToCart={handleAddToCart}
          onSetIsOpenDetail={handleOpenDetail}
        />
        {isOpen && (
          <Cart
            onHandleChangeQuantityFromCart={handleChangeQuantityFromCart}
            carts={carts}
            onCloseCart={handleCloseCart}
            // onOpenForm={handleOpenForm}
            onDeleteProductFromCart={handleDeleteProductFromCart}
          />
        )}
        {isOpenDetail && (
          <ProductDetail product={selectedProduct} onCloseDetail={handleCloseDetail} />
        )}
      </div>
      <Footer />
    </>
  );
}
