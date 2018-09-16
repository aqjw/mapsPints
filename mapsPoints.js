
function MapsPoints( center, points, around )
{
	this.center = center;
	this.points = points;
	this.around = +around;

	this._inside = [];
	this._outside = [];
}

MapsPoints.prototype.run = function()
{
	for (var i = 0; i < this.points.length; i++)
	{
		if( this._mathAround( this.points[i] ) <= this.around )
		{
			this._inside.push(this.points[i]);
		}else{
			this._outside.push(this.points[i]);
		}
	}

	return this;
};

MapsPoints.prototype.getOutside = function(){
	return this._outside;
};

MapsPoints.prototype.getInside = function(){
	return this._inside;
};

MapsPoints.prototype._mathAround = function( point )
{
	function deg2rad(deg) {
		return deg * (Math.PI/180)
	}

	// Radius of the earth in m
	var R = 6371000;

	var dLat = deg2rad(point.lat - this.center.lat);
	var dLon = deg2rad(point.lng - this.center.lng); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(this.center.lat)) * Math.cos(deg2rad(point.lat)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
	;

	return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
};




function initMap()
{
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: -25.363, lng: 131.044}
  });


	var center = { lat: -25.363, lng: 131.044 };
	var points = [
		{ lat: -25.353, lng: 131.024 },
		{ lat: -25.343, lng: 131.034 },
		{ lat: -25.333, lng: 131.044 },
		{ lat: -25.323, lng: 131.054 },
		{ lat: -25.313, lng: 131.064 },
		{ lat: -25.303, lng: 131.074 },
	];
	var m = new MapsPoints( center, points, 4000 );

	// center Marker
	new google.maps.Marker({
		position: center,
		map: map,
		title: 'Hello World!'
	});

	// get points inside
	points = m.run().getInside();

	for (var i = 0; i < points.length; i++)
	{
		// add Marker
		new google.maps.Marker({
			position: points[i],
			map: map,
			title: 'Hello World!'
		});
	}
}
