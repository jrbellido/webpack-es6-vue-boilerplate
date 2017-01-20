import ItemReducer from "./ItemReducer"
import ItemEditReducer from "./ItemEditReducer"
import BoardReducer from "./BoardReducer"
import PinReducer from "./PinReducer"

export default {
	items: ItemReducer,
	item: ItemEditReducer,
	boards: BoardReducer,
	pins: PinReducer
}
