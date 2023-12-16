import React, { useEffect, useRef } from "react";
// import product from "../../../apis/product";
// import data from "./data.json";
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

  const [posts, setPosts] = useState([]);
  // const [selectedItem, setSelectedItem] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
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
    axios
      .get("https://65743d90f941bda3f2af8183.mockapi.io/api/qlxe/cars")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Tìm kiếm dựa trên trường "hieuxe"
    const filteredPosts = posts.filter((post) =>
      post.hieuxe.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Cập nhật danh sách bài viết đã lọc
    // Đây là nơi bạn có thể lưu danh sách bài viết đã lọc để hiển thị trong giao diện người dùng
    console.log(filteredPosts);
  }, [searchValue, posts]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="container ">
        <div>
          <input
            type="text"
            placeholder="Search by hieuxe"
            value={searchValue}
            onChange={handleSearchChange}
          />
          {/* Hiển thị danh sách bài viết đã lọc */}
          {/* setPosts={posts} */}
          {filteredPosts.map((posts) => (
            <div key={posts.id}>
              <h3>{posts.name}</h3>
              <p>Price: {posts.price}</p>
              <p>Description: {posts.description}</p>
              <p>Short Description: {posts.shortDescription}</p>
              <p>Quantity: {posts.quantity}</p>
              <img src={posts.image} alt={posts.name} />
              <p>Hieuxe: {posts.hieuxe}</p>
            </div>
          ))}
        </div>
        <h1 className="text-center text-primary pt-5">LUXURY CAR</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger mb-4 " onClick={() => setIsOpen(true)}>
            <i class="fa fa-paper-plane"></i> Lịch đặt xe ({totalProduct})
          </button>
        </div>
        <ProductList
          onGetProduct={handleGetProduct}
          products={posts}
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
