const reducer = (state, action) => {
  switch (action.type) {
    case "IN":
      return { token: action.token };
    case "OUT":
      return { token: "" };
    default:
      return state;
  }
};
export default reducer;
