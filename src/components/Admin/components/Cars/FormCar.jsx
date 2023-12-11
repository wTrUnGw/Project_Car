import React, { useEffect, useRef, useState } from "react";
import useCarValidation from "../../apis/useCarValidation";

export default function FormCar({
  onAddUser,
  selectedUser,
  isUpdating,
  cancelUpdate,
  handleUpdateUser,
}) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    hieuxe: "",
    description: "",
    shortdescription: "",
    quanlity: "",
    image: "",
  });
  const emptyValidation = useRef({
    id: "",
    name: "",
    hieuxe: "",
    description: "",
    shortdescription: "",
    quanlity: "",
    image: "",
  });
  const [validation, setValidation] = useState(emptyValidation.current);

  const { checkEmpty } = useCarValidation();
  const handleChange = (e) => {
    const { target } = e;
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValid = true;
    const valid = {
      id: {
        status: checkEmpty(user.id),
        messageError: "ID không được bỏ trống",
      },
    };
    for (const key in valid) {
      if (!valid[key].status) {
        setValidation((prev) => ({
          ...prev,
          [key]: valid[key].messageError,
        }));
      } else {
        setValidation((prev) => ({
          ...prev,
          [key]: "",
        }));
      }
      inputValid &= valid[key].status;
    }
    if (!inputValid) return;
    if (isUpdating) {
      handleUpdateUser(selectedUser.id, user);
      setUser({
        id: "",
        name: "",
        hieuxe: "",
        description: "",
        shortdescription: "",
        quanlity: "",
        image: "",
      });
      cancelUpdate();
      return;
    }
    onAddUser(user);
    setUser({
      id: "",
      name: "",
      hieuxe: "",
      description: "",
      shortdescription: "",
      quanlity: "",
      image: "",
    });
  };

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
      setValidation(emptyValidation.current);
      return;
    }
    setUser({
      id: "",
      name: "",
      hieuxe: "",
      description: "",
      shortdescription: "",
      quanlity: "",
      image: "",
    });
  }, [selectedUser]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Mã xe</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã sv"
                name="id"
                onChange={handleChange}
                value={user.id}
              />
              {validation.id && (
                <div className="alert alert-danger mt-2 " role="alert">
                  {validation.id}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Tên xe</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập name"
                name="name"
                onChange={handleChange}
                value={user.name}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Hiệu xe</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập hiệu xe"
                name="hieuxe"
                onChange={handleChange}
                value={user.hieuxe}
              />
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Viết mô tả"
                name="description"
                onChange={handleChange}
                value={user.description}
              />
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-group">
              <label>shortdescription</label>
              <input
                type="text"
                className="form-control"
                placeholder="Viết mô tả"
                name="shortdescription"
                onChange={handleChange}
                value={user.shortdescription}
              />
            </div>
          </div>

          <div className="col-md-6 mt-4">
            <div className="form-group">
              <label>quanlity</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập số lượng xe còn ở bãi"
                name="quanlity"
                onChange={handleChange}
                value={user.quanlity}
              />
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="form-group">
              <label>Hình ảnh</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập link hình"
                name="image"
                onChange={handleChange}
                value={user.image}
              />
            </div>
          </div>
        </div>
        {isUpdating ? (
          <>
            <button className="btn btn-info mt-4" type="submit">
              Update
            </button>

            <button
              className="btn btn-danger mt-4 ms-2"
              onClick={() => {
                setUser({
                  id: "",
                  name: "",
                  hieuxe: "",
                  description: "",
                  shortdescription: "",
                  quanlity: "",
                  image: "",
                });
                cancelUpdate();
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-success mt-4">Thêm xe</button>
        )}
      </form>
    </div>
  );
}
