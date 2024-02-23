// examSlice.js
import { createSlice } from '@reduxjs/toolkit';
import examData from '../db/examData.json';

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    data: examData,
    userAnswers: {},
    userScore: 0,
    submitted: false,
  },
  reducers: {
    updateUserAnswer: (state, action) => {
      const { questionIndex, answerIndex } = action.payload;
      if (answerIndex === undefined) {
        state.userAnswers = {};
      } else {
        state.userAnswers[questionIndex] = answerIndex;
      }
    },
    updateUserScore: (state, action) => {
      state.userScore = action.payload;
    },
    submitAnswers: (state) => {
      state.submitted = true;
    },
  },
});

export const { updateUserAnswer, updateUserScore, submitAnswers } = examSlice.actions;
export default examSlice.reducer;
