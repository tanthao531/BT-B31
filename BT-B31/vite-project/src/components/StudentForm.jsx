import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addStudent,
  updateStudent,
  setSelectedStudent,
} from "../redux/studentSlice";

function StudentForm() {
  const dispatch = useDispatch();

  const { students, selectedStudent } = useSelector(
    (state) => state.student
  );

  const [student, setStudent] = useState({
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
      setIsEdit(true);
    } else {
      setStudent({
        maSV: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
      });

      setIsEdit(false);
    }
  }, [selectedStudent]);

  const validate = () => {
    let newErrors = {};

    if (!student.maSV.trim()) {
      newErrors.maSV = "Mã SV không được bỏ trống";
    }

    if (!student.hoTen.trim()) {
      newErrors.hoTen = "Họ tên không được bỏ trống";
    }

    if (!student.soDienThoai.trim()) {
      newErrors.soDienThoai =
        "Số điện thoại không được bỏ trống";
    } else if (
      !/^[0-9]{10,11}$/.test(student.soDienThoai)
    ) {
      newErrors.soDienThoai =
        "Số điện thoại không hợp lệ";
    }

    if (!student.email.trim()) {
      newErrors.email = "Email không được bỏ trống";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        student.email
      )
    ) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors({
      maSV: newErrors.maSV || "",
      hoTen: newErrors.hoTen || "",
      soDienThoai: newErrors.soDienThoai || "",
      email: newErrors.email || "",
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (isEdit) {
      dispatch(updateStudent(student));
      dispatch(setSelectedStudent(null));
    } else {
      const exist = students.find(
        (sv) => sv.maSV === student.maSV
      );

      if (exist) {
        alert("Mã sinh viên đã tồn tại");
        return;
      }

      dispatch(addStudent(student));
    }

    setStudent({
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    });

    setErrors({
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    });

    setIsEdit(false);
  };

  const handleCancel = () => {
    dispatch(setSelectedStudent(null));

    setStudent({
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    });

    setErrors({
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    });

    setIsEdit(false);
  };

  return (
    <div className="card">
      <div className="card-header bg-dark text-white">
        <h3 className="mb-0">Thông Tin Sinh Viên</h3>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Mã Sinh Viên
              </label>

              <input
                type="text"
                className="form-control"
                name="maSV"
                value={student.maSV}
                onChange={handleChange}
                disabled={isEdit}
              />

              <small className="text-danger">
                {errors.maSV}
              </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Họ Tên
              </label>

              <input
                type="text"
                className="form-control"
                name="hoTen"
                value={student.hoTen}
                onChange={handleChange}
              />

              <small className="text-danger">
                {errors.hoTen}
              </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Số Điện Thoại
              </label>

              <input
                type="text"
                className="form-control"
                name="soDienThoai"
                value={student.soDienThoai}
                onChange={handleChange}
              />

              <small className="text-danger">
                {errors.soDienThoai}
              </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="text"
                className="form-control"
                name="email"
                value={student.email}
                onChange={handleChange}
              />

              <small className="text-danger">
                {errors.email}
              </small>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            {isEdit
              ? "Cập nhật sinh viên"
              : "Thêm sinh viên"}
          </button>

          {isEdit && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleCancel}
            >
              Hủy
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default StudentForm;