/*
 * @Author: Binggan
 * @Date: 2022-03-01 15:53:49
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-01 17:56:23
 * @Description:地图相关操作
 */
import L from "leaflet";
import "@supermap/iclient-leaflet";
import reuest from "@/utils/request"

let oMap;
let markerLayer;

const proMapUrl = "/iserver/services/map-wlmq_dzwl/rest/maps/wlmq_4326";
const devMapUrl = "http://172.22.20.10:8080/iserver/services/map-wlmq_dzwl/rest/maps/wlmq_4326";

const mapLayersUrl = process.env.NODE_ENV === "production" ? proMapUrl : devMapUrl;
const drawCircle = (lat, lng, r, color, layer) => {
    L.circle([lat, lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.3,
        radius: r
    }).addTo(layer);
}
export const destroyMap = () => {
    oMap = null;
}
export function initMapLeaflet(mapId, zoom = 16, params) {
  // let latitude = 43.85942;
  // let longitude = 87.62418;

  const longitude = 87.63645; // 经度
  const latitude = 43.865834; // 纬度
  // 初始化地图
  oMap = L.map(mapId, {
    // preferCanvas: true,
    crs: L.CRS.EPSG4326,
    center: [latitude, longitude],
    maxZoom: 22,
    minZoom: 10,
    zoom,
    zoomControl: false // 隐藏缩放控件
  });
  // 添加图层
  var layer = L.supermap.tiledMapLayer(mapLayersUrl, {}).addTo(oMap);
  layer.on("load", function(e) {
    // 进入该方法表示图层已加载完毕
  });
  oMap._onResize();
  oMap.invalidateSize(true);

  if (params) {
    const cirs = params.split("@");
    for (let i = 0; i < cirs.length; i++) {
      const arrs = cirs[i].split(",");
      const r = arrs[0];
      const color = arrs[1];
      drawCircle(latitude, longitude, r, color, oMap);
    }
  }
}

export function addMarkerData(data = [], isShowCircle = true) {
    let icon;
    if (markerLayer !== undefined) {
        oMap.removeLayer(markerLayer);
    }
    let firstView = true;
    let firstJd;
    let firtwd;
    var points = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i]["type"] === 0) {
            // 健康卡
            icon = new L.Icon({
                iconUrl:
                    "/wulumuqilsH5/assets/static/supermapLeaflet/image/location_3.png"
            });
            // } else if (data[i]['type'] == 1) {
            //     //隔离点
            //     icon = new L.Icon({
            //         iconUrl: '/wulumuqilsH5/assets/static/supermapLeaflet/image/location_1.png',
            //     });
            // } else if (data[i]['type'] == 2) {
        } else {
            // 医疗机构
            icon = new L.Icon({
                iconUrl:
                    "/wulumuqilsH5/assets/static/supermapLeaflet/image/location_1.png"
            });
        }
        // let key = 'type' + data[i]['type'] + '_' + data[i]['code'];
        if (data[i]["jd"] !== "" && data[i]["wd"] !== "") {
            let jd, wd;
            if (data[i]["jd"] > data[i]["wd"]) {
                jd = parseFloat(data[i]["wd"]);
                wd = parseFloat(data[i]["jd"]);
            } else {
                jd = parseFloat(data[i]["jd"]);
                wd = parseFloat(data[i]["wd"]);
            }
            if (firstView) {
                firstJd = jd;
                firtwd = wd;
                // 画圈
                firstView = false;
            }
            const marker = L.marker([jd, wd], { icon: icon });
            points.push(marker);
        }
    }
    if (points.length > 0) {
        markerLayer = L.featureGroup(points).addTo(oMap);
        oMap.setView([firstJd, firtwd], 16);
        if (isShowCircle) {
            // 画圈
            drawCircle(firstJd, firtwd, 800, "green", markerLayer);
            drawCircle(firstJd, firtwd, 500, "yellow", markerLayer);
            drawCircle(firstJd, firtwd, 300, "red", markerLayer);
        }
    }
}

function getZoneData(data) {
    return reuest.get(
        `/xinjiang-sys/ThreeZone/analysis?lat=${data.lat}&lng=${data.lng}`
    );
}

const myIcon = L.icon({
    iconUrl: require("@/assets/static/supermapLeaflet/image/marker-icon.png")
});

const cache = {};
function getLayer(name) {
    if (!cache[name]) cache[name] = L.featureGroup().addTo(oMap);

    return cache[name];
}

export function addPoint(peoplePoints) {
    var resultLayer = getLayer("result");
    var markerLayer = getLayer("marker");
    resultLayer.clearLayers();
    markerLayer.clearLayers();
    // console.log(peoplePoints, 1111111111);
    // console.log(omap.setView);

    oMap.setView({ lat: 43.865834, lng: 87.63645 }, 3);

    peoplePoints.forEach((value, index) => {
        const marker = L.marker(value, { icon: myIcon }).addTo(markerLayer);

        marker.on("click", function(result) {
            resultLayer.clearLayers();
            // 点击点位定位到该点位置
            oMap.flyTo(result.latlng, 15);
            getZoneData({
                lat: result.latlng.lat,
                lng: result.latlng.lng
            }).then((res) => {
                console.log("请求结果", res);
                const geojson0 = L.Util.toGeoJSON(res.features[0]);
                const geojson1 = L.Util.toGeoJSON(res.features[1]);
                const geojson2 = L.Util.toGeoJSON(res.features[2]);
                L.geoJSON(geojson0, {
                    onEachFeature: (f, e) => {
                        e.setStyle({ color: "#09d082" });
                        e.addTo(resultLayer);
                    }
                });
                L.geoJSON(geojson1, {
                    onEachFeature: (f, e) => {
                        e.setStyle({ color: "blue", opacity: 0.5 });
                        e.addTo(resultLayer);
                    }
                });
                L.geoJSON(geojson2, {
                    onEachFeature: (f, e) => {
                        e.setStyle({ color: "red", opacity: 0.5 });
                        e.addTo(resultLayer);
                    }
                });
            });
        });
    });
}

export function clearPoint() {
    var resultLayer = getLayer("result");
    var markerLayer = getLayer("marker");
    resultLayer.clearLayers();
    markerLayer.clearLayers();
}
