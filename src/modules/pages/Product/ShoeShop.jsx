import React from "react";
import data from "./data.json";
import ProductList from "./ProductList";
import { useState } from "react";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";

export default function ShoeShop() {
  // state quản lý giá trị sản phẩm đang được chọn để xem chi tiết
  const [selectedProduct, setselectedProduct] = useState(null);

  //modal - state quản lý trạng thái ẩn hiện của modal giỏ hàng
  const [isOpen, setIsOpen] = useState(false);

  //modal - state quản lý trạng thái ẩn hiện của Detail
  const [isOpenDetail, setIsOpenDetail] = useState(false);

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
  return (
    <div className="container ">
      <h1 className="text-center text-primary">Shoe Shop</h1>
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={() => setIsOpen(true)}>
          Lịch đặt xe ({totalProduct})
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
          onDeleteProductFromCart={handleDeleteProductFromCart}
        />
      )}
      {isOpenDetail && (
        <ProductDetail product={selectedProduct} onCloseDetail={handleCloseDetail} />
      )}
    </div>
  );
}
