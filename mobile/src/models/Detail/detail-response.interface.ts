import Point from '../Point/point.interface';
import Item from '../Item/item.interface';

interface DetailResponse {
	point: Point;
	items: Item[]
}

export default DetailResponse;
