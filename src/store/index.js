// Branches
import Branch from "./branch";

const initialState = window.__INITIAL_STATE__ || {};

const store = {
  branch: new Branch(initialState.branch)
};

export default store;
