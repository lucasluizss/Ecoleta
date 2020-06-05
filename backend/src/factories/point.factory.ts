class PointFactory {
	static create(point: any) {
		return {
			...point,
			image_url: `http://192.168.0.22:3333/uploads/${point.image}`
		};
	}
}

export default PointFactory;