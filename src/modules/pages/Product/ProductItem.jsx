import React from "react";

export default function ProductItem({ product, onAddToCart, onSetIsOpenDetail, onGetProduct }) {
  const handleOpenAndShow = (product) => {
    onSetIsOpenDetail();
    onGetProduct(product);
  };
  return (
    <div className="card mb-5">
      <img className="card-img width={100%}" alt="" src={product.image}></img>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">Tiền cọc: {product.price} VNĐ</p>
        <button
          className="btn btn-warning ms-1"
          onClick={() => {
            onAddToCart(product);
          }}
        >
          ĐẶT XE
        </button>
        <button
          className="btn btn-info ms-1"
          onClick={() => {
            handleOpenAndShow(product);
          }}
        >
          XEM NHANH
        </button>
        <button className="btn btn-dark mt-2 ms-1">
          <i class="fa fa-circle-info"></i>XEM CHI TIẾT XE
        </button>
      </div>
    </div>
  );
}
