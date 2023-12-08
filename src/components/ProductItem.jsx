import React from "react";

export default function ProductItem() {
  return (
    <div className="card_cardPhone">
      <img src="./img/45V1.png" alt="" className="card-img-top" width="100%" />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h3 className="cardPhone_title">Xe 45 chổ</h3>
            <p className="cardPhone_text">Xe đầy đủ tiện nghi</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="cardPhone_rating">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
          </div>
          <div>
            <button className="btnPhone-shadow">
              <i className="fa fa-shopping-cart" /> Book Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
