import environment from "../environments/environment";

class ItemFactory {
	public static create(item: any) {
		return {
			id: item.id,
			title: item.title,
			image_url: `${environment.baseUrl}/uploads/${item.image}`
		};
	}
}

export default ItemFactory;