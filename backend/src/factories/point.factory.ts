import environment from "../environments/environment";

class PointFactory {
	static create(point: any) {
		return {
			...point,
			image_url: `${environment.baseUrl}/uploads/${point.image}`
		};
	}
}

export default PointFactory;