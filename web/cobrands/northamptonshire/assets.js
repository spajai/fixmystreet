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

})();
