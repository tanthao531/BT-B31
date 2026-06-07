import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteStudent,
  setSelectedStudent,
  setKeyword,
} from "../redux/studentSlice";

function StudentTable() {
  const dispatch = useDispatch();

  const { students, keyword } = useSelector(
    (state) => state.student
  );

  const filteredStudents = students.filter(
    (sv) =>
      sv.maSV
        .toLowerCase()
        .includes(keyword.toLowerCase()) ||
      sv.hoTen
        .toLowerCase()
        .includes(keyword.toLowerCase()) ||
      sv.email
        .toLowerCase()
        .includes(keyword.toLowerCase())
  );

  return (
    <>
      <div className="mb-3 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm sinh viên..."
          value={keyword}
          onChange={(e) =>
            dispatch(setKeyword(e.target.value))
          }
        />
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((item) => (
            <tr key={item.maSV}>
              <td>{item.maSV}</td>
              <td>{item.hoTen}</td>
              <td>{item.soDienThoai}</td>
              <td>{item.email}</td>

              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() =>
                    dispatch(
                      setSelectedStudent(item)
                    )
                  }
                >
                  Sửa
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    dispatch(
                      deleteStudent(item.maSV)
                    )
                  }
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StudentTable;