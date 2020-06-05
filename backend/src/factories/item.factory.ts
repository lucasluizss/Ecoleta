class ItemFactory {
	public static create(item: any) {
		return {
			id: item.id,
			title: item.title,
			image_url: `http://192.168.0.22:3333/uploads/${item.image}`
		};
	}
}

export default ItemFactory;