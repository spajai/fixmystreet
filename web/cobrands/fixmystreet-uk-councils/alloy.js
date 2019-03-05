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

        return OpenLayers.Format.GeoJSON.prototype.read.apply(this, [obj, type, filter]);
    },

    CLASS_NAME: "OpenLayers.Format.Alloy"
});

OpenLayers.Protocol.Alloy = OpenLayers.Class(OpenLayers.Protocol.HTTP, {
    read: function(options) {
        OpenLayers.Protocol.prototype.read.apply(this, arguments);
        options = options || {};
        options.params = OpenLayers.Util.applyDefaults(
            options.params, this.options.params);
        options = OpenLayers.Util.applyDefaults(options, this.options);
        var all_tiles = this.getTileRange_(options.scope.bounds, options.scope.layer.maxExtent, options.scope.layer.map);
        var rresp;
        var start = new Date();
        var max = all_tiles.length;
        $(fixmystreet).trigger('alloy:start_request', [start, max]);
        for (var i = 0; i < max; i++) {
            var resp = new OpenLayers.Protocol.Response({requestType: "read"});
            resp.start = start;
            var url = this.getURL(all_tiles[i], options);
            resp.priv = OpenLayers.Request.GET({
                url: url, //options.url,
                callback: this.createCallback(this.handleRead, resp, options),
                params: options.params,
                headers: options.headers
            });
            rresp = resp;
        }
        return rresp;
    },

    getURL: function(coords, options) {
        return OpenLayers.String.format(options.base, {'layerid': options.layerid, 'layerVersion': options.layerVersion, 'z': 15, 'x': coords[0], 'y': coords[1]});
    },

    getTileRange_: function(bounds, maxExtent, map) {
        var min = this.getTileCoord_([bounds.left, bounds.top], maxExtent, map, true);
        var max = this.getTileCoord_([bounds.right, bounds.bottom], maxExtent, map, false);
        var coords = [];
        for (var i = min[0], ii = max[0]; i <= ii; ++i) {
          for (var j = min[1], jj = max[1]; j <= jj; ++j) {
              coords.push([i,j]);
          }
        }
        return coords;
    },

    getTileCoord_: function(bounds, maxExtent, map, reverse) {
        var origin = new OpenLayers.LonLat(maxExtent.left, maxExtent.top);
        var resolution = map.getResolutionForZoom(3);

        var adjustX = reverse ? 0.5 : 0;
        var adjustY = reverse ? 0 : 0.5;
        var xFromOrigin = Math.floor((bounds[0] - origin.lon) / resolution + adjustX);
        var yFromOrigin = Math.floor((bounds[1] - origin.lat) / resolution + adjustY);
        var tileCoordX = Math.floor(xFromOrigin / 512);
        var tileCoordY = Math.floor(yFromOrigin / 512) * -1;

        if (reverse) {
            tileCoordX -= 1;
            tileCoordY -= 1;
        }

        return [ tileCoordX, tileCoordY ];
    }
});

OpenLayers.Strategy.Alloy = OpenLayers.Class(OpenLayers.Strategy.FixMyStreet, {
    count: 0,
    max: 0,
    requestStart: 0,
    initialize: function(name, options) {
        OpenLayers.Strategy.FixMyStreet.prototype.initialize.apply(this, arguments);
        $(fixmystreet).on('alloy:start_request', this.newRequest.bind(this));
    },
    newRequest: function(evt, start, max) {
      this.max = max;
      this.requestStart = start;
      this.count = 0;
      this.layer.destroyFeatures();
    },
    merge: function(resp) {
        // because we are issueing async requests it's possible that if someone moves the
        // map we've triggered a new set of requests, in which case ignore the old ones.
        if (resp.start < this.requestStart) {
          return;
        }
        this.count++;
        if (resp.success()) {
            var features = resp.features;
            if(features && features.length > 0) {
                var remote = this.layer.projection;
                var local = this.layer.map.getProjectionObject();
                if(!local.equals(remote)) {
                    var geom;
                    for(var i=0, len=features.length; i<len; ++i) {
                        geom = features[i].geometry;
                        if(geom) {
                            geom.transform(remote, local);
                        }
                    }
                }
                this.layer.addFeatures(features);
            }
        } else {
            this.bounds = null;
        }
        if (this.count == this.max) {
            if ( this.layer.checkFeature ) {
                this.layer.checkFeature(null, fixmystreet.get_lonlat_from_dom());
            }
            this.layer.events.triggerEvent("loadend", {response: resp});
        }
    },

});

fixmystreet.assets.alloy_defaults = {
    http_options: {
      base: "https://alloy-api-tile01.yotta.co.uk/api/render-layer/tile/${layerid}/28/${layerVersion}-/${z}/${x}/${y}",
    },
    format_class: OpenLayers.Format.Alloy,
    geometryName: 'msGeometry',
    srsName: "EPSG:3857",
    strategy_class: OpenLayers.Strategy.Alloy
};

})();
