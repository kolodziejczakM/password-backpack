export default function dashboardReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_TEXT':
      return [...state, action.text];
    default: return state;
  }
}
