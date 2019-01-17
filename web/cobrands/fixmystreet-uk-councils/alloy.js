(function(){

OpenLayers.Format.Alloy = OpenLayers.Class(OpenLayers.Format.GeoJSON, {
    read: function(json, type, filter) {
        type = (type) ? type : "FeatureCollection";
        var results = null;
        var obj = null;
        if (typeof json == "string") {
            obj = OpenLayers.Format.JSON.prototype.read.apply(this, [json, filter]);
        } else {
            obj = json;
        }
        if(!obj) {
            OpenLayers.Console.error("Bad JSON: " + json);
            return;
        }

        var data = obj;
        obj = {
          'type': 'FeatureCollection',
          'features': []
        };
        for (var i = 0, l=data.resources.length; i<l; i++) {
            var item = data.resources[i];
            var feature = {
              'id': item.resourceId,
              'type': 'Feature',
            };
            var geojson = item.geometry.featureGeom;
            if (geojson) {
              obj.features.push(geojson);
            }
        }
        return OpenLayers.Format.GeoJSON.prototype.read.apply(this, [obj, type, filter]);
    },

    CLASS_NAME: "OpenLayers.Format.Alloy"
});

fixmystreet.assets.alloy_defaults = {
    http_options: {
      url: "https://alloy-api.yotta.co.uk/api/resource/",
      headers: {
        apiKey: '' // need to fill this in
      },
      filterToParams: function(filter, params) {
        var bounds = [
          [ filter.value.left, filter.value.top ],
          [ filter.value.left, filter.value.bottom ],
          [ filter.value.right, filter.value.bottom ],
          [ filter.value.right, filter.value.top ],
          [ filter.value.left, filter.value.top ]
        ];
        var j = new OpenLayers.Format.JSON();
        var boundingGeoJson = j.write({ coordinates: [ bounds ], type: "Polygon" });
        params.boundingGeoJson = boundingGeoJson;
        return params;
      }
    },
    format_class: OpenLayers.Format.Alloy,
    asset_type: 'spot',
    geometryName: 'msGeometry',
    always_visible: true,
    srsName: "EPSG:3857",
    strategy_class: OpenLayers.Strategy.FixMyStreet
};

})();
