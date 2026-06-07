import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [
    {
      maSV: "SV001",
      hoTen: "Nguyễn Văn A",
      soDienThoai: "0901234567",
      email: "a@gmail.com",
    },
    {
      maSV: "SV002",
      hoTen: "Nguyễn Văn B",
      soDienThoai: "0908888888",
      email: "b@gmail.com",
    },
  ],

  selectedStudent: null,
  keyword: "",
};

const studentSlice = createSlice({
  name: "student",

  initialState,

  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },

    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (sv) => sv.maSV !== action.payload
      );
    },

    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (sv) => sv.maSV === action.payload.maSV
      );

      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },

    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },

    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  updateStudent,
  setSelectedStudent,
  setKeyword,
} = studentSlice.actions;

export default studentSlice.reducer;