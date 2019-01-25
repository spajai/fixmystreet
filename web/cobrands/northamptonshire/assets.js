(function(){

if (!fixmystreet.maps) {
    return;
}

fixmystreet.assets.add($.extend(true, {}, fixmystreet.assets.alloy_defaults, {
    protocol: OpenLayers.Protocol.Alloy,
    http_options: {
      layerid: 60,
      layerVersion: 60.2022,
    },
    asset_type: 'spot',
    feature_code: 'itemId',
    body: "Northamptonshire County Council",
    asset_category: [ 'Road traffic signs' ],
    asset_item: 'sign',
    attributes: {
      asset_resource_id: function() {
        return this.fid;
      }
    }
}));

fixmystreet.assets.add($.extend(true, {}, fixmystreet.assets.alloy_defaults, {
    protocol: OpenLayers.Protocol.Alloy,
    http_options: {
      layerid: 12,
      layerVersion: 12.6,
    },
    body: "Northamptonshire County Council",
    road: true,
    always_visible: true,
    non_interactive: true,
    all_categories: true,
    asset_item: 'road',
    usrn: {
        attribute: 'fid',
        field: 'asset_resource_id'
    },
    getUSRN: function(feature) {
      return feature.fid;
    }
}));

})();
