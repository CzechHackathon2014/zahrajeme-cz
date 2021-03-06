require('fetch');

module.exports = {
	/**
	 *
	 * @param {Array<Number>} coords  Longitude and Latitude
	 * @param {Number} radius
	 * @param {String} [sportId}
	 * @returns {*}
	 */
	getNear: function(coords, radius, sportId) {
		coords = JSON.stringify(coords);
		var url;
		if (sportId) {
			url = '/api/ads?conditions={ "sports": {"$eq": "' + sportId + '" }, "location": { ' +
			'"$nearSphere": {"$geometry":{"type":"Point", "coordinates" : ' +
			coords + '}, "$maxDistance": ' + radius	+'}} }'
		} else {
			url = '/api/ads?conditions={ "location": { "$nearSphere": {"$geometry":{"type":"Point", "coordinates" : ' +
			coords + '}, "$maxDistance": ' + radius	+'}} }'
		}
		return fetch(url);
	},
	create: function(ad) {
		return fetch('/api/ads', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(ad)
		});
	}
};