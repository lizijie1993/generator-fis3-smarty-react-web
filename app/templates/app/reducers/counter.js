import * as AT from '../constants/actions'

export default function counter(
  state={
    value: 0,
  },
  action) {
  switch (action.type) {
    case AT.INCREMENT:
      return { value: state.value + 1 }
    case AT.DECREMENT:
      return { value: state.value - 1 }
    default:
      return state;
  }
}
