import { ROOMS_FILTER_ACTIONS, type RoomsFilterAction } from "./actions";
import { INITIAL_FILTER_STATE, type RoomsFilterState } from "./initial-state";

export function roomsFilterReducer(
  state: RoomsFilterState,
  action: RoomsFilterAction,
): RoomsFilterState {
  switch (action.type) {
    case ROOMS_FILTER_ACTIONS.SET_CATEGORY:
      return { ...state, category: action.payload };

    case ROOMS_FILTER_ACTIONS.SET_MIN_CAPACITY:
      return { ...state, minCapacity: action.payload };

    case ROOMS_FILTER_ACTIONS.SET_PRICE_RANGE:
      return { ...state, minPrice: action.payload.min, maxPrice: action.payload.max };

    case ROOMS_FILTER_ACTIONS.SET_AVAILABLE:
      return { ...state, available: action.payload };

    case ROOMS_FILTER_ACTIONS.CLEAR_FILTERS:
      return { ...INITIAL_FILTER_STATE };

    case ROOMS_FILTER_ACTIONS.SET_FILTERS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
