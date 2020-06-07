class PointItemsFactory {
	static create(item: any, point_id: number) {
		return String(item)
			.trim()
			.split(',')
			.map(Number)
			.map((item_id: number) => {
				return {
					item_id,
					point_id
				}
			});
	}
}

export default PointItemsFactory;