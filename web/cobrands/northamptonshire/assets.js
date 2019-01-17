(function(){

if (!fixmystreet.maps) {
    return;
}


fixmystreet.assets.add($.extend(true, {}, fixmystreet.assets.alloy_defaults, {
    http_options: {
      url: "https://alloy-api.yotta.co.uk/api/resource/",
      headers: {
        apiKey: '' // need to populate this somehow
      },
      params: {
        sourceId: 2086
      }
    },
    body: "Northamptonshire County Council",
    always_visible: true
}));

})();
