(function(){

if (!fixmystreet.maps) {
    return;
}


var layers = [
{
  "category": "Street Lights",
  "layer": 5,
  "version": "5.4-9.6-"
},
{
  "category": "Street Lighting Nightscape",
  "layer": 9,
  "version": "9.6-"
},
{
  "category": "Grit Bins",
  "layer": 13,
  "version": "13.5-"
},
{
  "category": "Structures",
  "layer": 14,
  "version": "14.2-"
},
{
  "category": "Carriageways",
  "layer": 20,
  "version": "20.54-"
},
{
  "category": "Road Heirarchy",
  "layer": 39,
  "version": "39.53-"
},
{
  "category": "Posts",
  "layer": 59,
  "version": "59.133-"
},
{
  "category": "Signs",
  "layer": 60,
  "version": "60.2111-"
},
{
  "category": "Grips",
  "layer": 61,
  "version": "61.1-"
},
{
  "category": "Traffic Monitoring",
  "layer": 62,
  "version": "62.2-"
},
{
  "category": "Special Treatment",
  "layer": 64,
  "version": "64.1-"
},
{
  "category": "Gully",
  "layer": 66,
  "version": "66.9-"
},
{
  "category": "Channel",
  "layer": 68,
  "version": "68.2-"
},
{
  "category": "Comms Cabinet",
  "layer": 69,
  "version": "69.1-"
},
{
  "category": "Steps",
  "layer": 70,
  "version": "70.1-"
},
{
  "category": "Step Handrail",
  "layer": 71,
  "version": "71.1-"
},
{
  "category": "Bus Stop",
  "layer": 72,
  "version": "72.6-"
},
{
  "category": "Tree Group",
  "layer": 74,
  "version": "74.1-"
},
{
  "category": "Defects Ancillary Items",
  "layer": 171,
  "version": "171.33-"
},
{
  "category": "Speed Limit",
  "layer": 172,
  "version": "172.33-"
},
{
  "category": "PRoW Network",
  "layer": 173,
  "version": "173.1-"
},
{
  "category": "Footway Schemes",
  "layer": 174,
  "version": "174.1-"
},
{
  "category": "BRIDGES",
  "layer": 177,
  "version": "177.17-"
},
{
  "category": "FINGER POST",
  "layer": 178,
  "version": "178.39-"
},
{
  "category": "GAPS",
  "layer": 179,
  "version": "179.1-"
},
{
  "category": "GATE",
  "layer": 181,
  "version": "181.2-"
},
{
  "category": "OBSTRUCTIONS",
  "layer": 182,
  "version": "182.2-"
},
{
  "category": "STEPS",
  "layer": 184,
  "version": "184.2-"
},
{
  "category": "STILE",
  "layer": 185,
  "version": "185.2-"
},
{
  "category": "WAYMARK POST",
  "layer": 187,
  "version": "187.2-"
},
{
  "category": "Gate Types",
  "layer": 191,
  "version": "191.2-"
},
{
  "category": "Gate Condition",
  "layer": 192,
  "version": "192.2-"
},
{
  "category": "Bridge Type",
  "layer": 193,
  "version": "193.17-"
},
{
  "category": "Bridge Condition",
  "layer": 194,
  "version": "194.17-"
},
{
  "category": "PRoW Net By Type",
  "layer": 201,
  "version": "201.1-"
},
{
  "category": "Finger Post Condition",
  "layer": 209,
  "version": "209.39-"
},
{
  "category": "F Post Path Type",
  "layer": 210,
  "version": "210.39-"
},
{
  "category": "AW_Sewer",
  "layer": 215,
  "version": "215.1-"
},
{
  "category": "CCTV",
  "layer": 218,
  "version": "218.1-"
},
{
  "category": "VMS",
  "layer": 219,
  "version": "219.1-"
},
{
  "category": "Warning Signs",
  "layer": 220,
  "version": "220.1-"
},
{
  "category": "Traffic Calming",
  "layer": 221,
  "version": "221.1-"
},
{
  "category": "Bluetooth Counter",
  "layer": 222,
  "version": "222.1-"
},
{
  "category": "Midblock",
  "layer": 223,
  "version": "223.1-"
},
{
  "category": "Over Height",
  "layer": 224,
  "version": "224.1-"
},
{
  "category": "TL Junction",
  "layer": 225,
  "version": "225.1-"
},
{
  "category": "RTI Display",
  "layer": 226,
  "version": "226.1-"
},
{
  "category": "System Links",
  "layer": 227,
  "version": "227.1-"
},
{
  "category": "Tree",
  "layer": 228,
  "version": "228.3-"
},
{
  "category": "CULVERTS (PRoW)",
  "layer": 229,
  "version": "229.1-"
},
{
  "category": "PEDESTRIAN GUARDRAIL",
  "layer": 230,
  "version": "230.1-"
},
{
  "category": "Traffic Signal Controller",
  "layer": 231,
  "version": "231.1-"
},
{
  "category": "Traffic Signal Posts",
  "layer": 232,
  "version": "232.1-"
},
{
  "category": "Safety Bollard",
  "layer": 233,
  "version": "233.1-"
},
];

$.each(layers, function(index, layer) {
  fixmystreet.assets.add($.extend(true, {}, fixmystreet.assets.alloy_defaults, {
      protocol: OpenLayers.Protocol.Alloy,
      http_options: {
        layerid: layer.layer,
        layerVersion: layer.version,
      },
      asset_type: 'spot',
      feature_code: 'itemId',
      body: "Northamptonshire County Council",
      asset_category: [ layer.category ],
      asset_item: layer.category,
      attributes: {
        asset_resource_id: function() {
          return this.fid;
        }
      }
  }));
});

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
