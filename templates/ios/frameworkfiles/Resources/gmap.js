/**
 * Created by bianyl on 2015/11/16.
 * 目前需要google提供的功能比较有限
 */
define([], function () {
  var GL = {};

  function CustomOverlay(point,options) {
    // 初始化参数：坐标、文字、地图
    //this._map = map;
    // 到onAdd时才需要创建div
    this._div = options.content;
    this._options = options;
    this._offset = options.offset;
    this._callBack = options.callBack;
    this._point = point;
    // 加入map
    //if(this.setMap){this.setMap(map);}
  }
  /**
   * 自定义控件类
   * @param options
   * @constructor
   */
  function CustomControls(options){
    this._options = options;
    //this._div = $(options.content)[0];
    var div = document.createElement('div');
    div.style.position = 'absolute';
    var x="0px",y="0px";
    if(options && options.offset){
      y = options.offset.y + "px";
      x = options.offset.x + "px";
    }
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = options.content;
    div.appendChild(tempDiv);
    this._div = div;
    this._id = "googleControl" + new Date().getTime();
    div.id = this._id;
    var anchor = options.anchor;
    if(anchor == "top-left"){
      div.style.marginTop = y;
      div.style.marginLeft = x;
      this._anchor = google.maps.ControlPosition.TOP_LEFT;
    }else if(anchor == "top-right"){
      div.style.marginTop = y;
      div.style.marginRight = x;
      this._anchor = google.maps.ControlPosition.TOP_RIGHT;
    } else if(anchor == "bottom-right"){
      div.style.marginBottom = y;
      div.style.marginRight = x;
      this._anchor = google.maps.ControlPosition.BOTTOM_RIGHT;
    } else{
      div.style.marginBottom = y;
      div.style.marginLeft = x;
      this._anchor = google.maps.ControlPosition.BOTTOM_LEFT;
    }
  }
  /**
   * 判断是否加载google地图
   * @returns {boolean}
   * @constructor
   */
  GL.hasGoogle = function(){
    if(typeof google != 'undefined'){
      return true;
    }
    return false;
  };

  /**
   * 兼容老的方案
   * 创建地图
   * @param config
   * @returns {google.maps.Map}
   */
  GL.createMapOld = function(config){
    if(typeof google == "undefined"){
      return ;
    }
    if(config.isBMap){
      var pos = GL.bMapToAMap(config.lng,config.lat);
      config.lng = pos.lng;
      config.lat = pos.lat;
    }
    var mapContainer = new google.maps.Map(document.getElementById(config.id), {
      // @description 地图中心点
      center : new google.maps.LatLng(config.lat, config.lng),
      zoom : config.level || 16 // @description 地图显示的比例尺级别
      //zoomControl : false
    });

    var markrViews = GL.createMarkerOld(config,mapContainer);
    if (config.zoomCallBack) {
      google.maps.event.addListener(mapContainer, 'zoom_changed', function () {
        var newMarkers;
        if(config.zoomCallBack){newMarkers = config.zoomCallBack(this.getZoom());}
        if (newMarkers) {
          //删除原有的markers
          if (markrViews.marekrs && markrViews.marekrs.length > 0) {
            for (var i = 0; i < markrViews.marekrs.length; i++) {
              if(markrViews.marekrs[i].setMap){markrViews.marekrs[i].setMap(null);}
            }
            markrViews = {
              marekrs : []
            };
          }
          markrViews = GL.createMarkerOld(newMarkers,this);
        }
      });
    }
    return mapContainer;
  };

  /**
   * 兼容老的方案，创建POI
   * @param config
   * @param mapObj
   * @returns {{marekrs: Array}}
   */
  GL.createMarkerOld = function(config, mapObj){
    var markrViews = {
      marekrs : []
    };
    var params ;
    if ((config.markers instanceof Array) && config.markers.length > 0) {
      params = config.markers;
    } else if(config instanceof  Array){
      params = config;
    }else {
      params = [config];
    }
    function handleGoogleClick(con) {
      if(con.callBack){con.callBack(con.markerId);}
    }
    for (var i = 0,tempConfig; i < params.length; i++) {
      var marker;
      tempConfig = params[i];
      if (!tempConfig || !tempConfig.lat || !tempConfig.lng) {
        continue;
      }
      if(tempConfig.isBMap){
        //百度地图坐标转成google
        var posM = GL.bMapToAMap(tempConfig.lng,tempConfig.lat);
        tempConfig.lng = posM.lng;
        tempConfig.lat = posM.lat;
      }

      marker = new google.maps.Marker({
        position : new google.maps.LatLng(tempConfig.lat, tempConfig.lng),
        map : mapObj,
        icon:tempConfig.icon || "//pic.c-ctrip.com/platform/h5/common/map_address.png",
        id : tempConfig.markerId
      });
      if(tempConfig.content){
        var infowindow = new google.maps.InfoWindow({
          content: tempConfig.content,
          maxWidth:200
        });
        infowindow.open(mapObj, marker);
      }
      //如果id存在设置为中心点
      if (tempConfig.id) {
        mapObj.setCenter(new google.maps.LatLng(tempConfig.lat, tempConfig.lng));
      }
      //google marker的点击事件
      google.maps.event.addListener(marker, 'click',function(){
        handleGoogleClick(tempConfig);
      });
      markrViews.marekrs.push(marker);
    }
    return markrViews;
  };

  /**
   * google显示地图
   * @param config
   * @returns {BMap.Map}
   */
  GL.createMap = function(config){
    if(config.isBMap){
      var pos = GL.bMapToAMap(config.lng,config.lat);
      config.lng = pos.lng;
      config.lat = pos.lat;
    }
    var mapContainer = new google.maps.Map(document.getElementById(config.id), {
      // @description 地图中心点
      center : new google.maps.LatLng(config.lat, config.lng),
      zoom : config.zoom || 15,// @description 地图显示的比例尺级别
      disableDefaultUI: true,
      disableDoubleClickZoom:!(!!config.DoubleClickZoom)
    });
    return mapContainer;
  };
  /**
   * 创建POI
   * @param config
   * @param mapObj
   */
  GL.createMarkers = function(config){
    var markers = [];
    function openInfoWindow(infoWindow){
      var map = this.getMap();
      infoWindow.open(map, this);
    }
    for (var i = 0,tempConfig; i < config.length; i++) {
      var marker;
      tempConfig = config[i];
      if (!tempConfig || !tempConfig.lat || !tempConfig.lng) {
        continue;
      }
      if(tempConfig.isBMap){
        //百度地图坐标进行转换
        var posM = GL.bMapToAMap(tempConfig.lng,tempConfig.lat);
        tempConfig.lng = posM.lng;
        tempConfig.lat = posM.lat;
      }
      var point = new google.maps.LatLng(tempConfig.lat, tempConfig.lng);
      var iconObj = tempConfig.icon;
      var image = {
        url : (iconObj && iconObj.url) || "//pic.c-ctrip.com/platform/h5/common/map_address.png",
        anchor : (iconObj && iconObj.anchor) ? new google.maps.Point(iconObj.anchor.w,iconObj.anchor.h) : new google.maps.Point(10,45),
        scaledSize : (iconObj && iconObj.size) ? new google.maps.Size(iconObj.size.w,iconObj.size.h) : new google.maps.Size(20,45),
        size : (iconObj && iconObj.contentSize) ? new google.maps.Size(iconObj.contentSize.w,iconObj.contentSize.h) : new google.maps.Size(30,60)
      };
      marker = new google.maps.Marker({
        position : point,
        icon : image
      });
      //扩展marker方法
      marker.openInfoWindow = openInfoWindow;
      markers.push(marker);
    }
    return markers;
  };

  /**
   *
   */
  GL.createControl = function(config){
    var customControl = new CustomControls(config);
    return customControl;
  };

  /**
   * 添加自定义control
   * @param config
   * @param map
   */
  GL.addControl = function(config,map){
    if(! (config instanceof CustomControls)){
      return ;
    }
    //if(config._anchor == google.maps.ControlPosition.BOTTOM_RIGHT){
    //  setTimeout(function(){
    //    $("#"+config._id).css("right",0);
    //  },1000);
    //}else if(config._anchor == google.maps.ControlPosition.BOTTOM_LEFT){
    //  setTimeout(function(){
    //    $("#"+config._id).css("left",0);
    //  },300);
    //}
    map.controls[config._anchor].push(config._div);
  };

  /**
   * 创建简单的infowindow
   * @param config
   * @returns {*}
   */
  GL.createInfoWindow = function(config){
    if(!config.content){
      return false;
    }
    var infoWindow = new google.maps.InfoWindow(config);
    return infoWindow;
  };
  /**
   * 创建google地图的marker
   * @param config
   * @param mapObj
   */
  GL.showOverLays = function(config,mapObj){
    for(var i = 0,overlay;i<config.length;i++){
      overlay = config[i];
      overlay.setMap(mapObj);
    }
  };

  /**
   * 隐藏google地图的marker
   * @param config
   * @param mapObj
   */
  GL.hideOverlays = function(config){
    for(var i = 0,overlay;i<config.length;i++){
      overlay = config[i];
      overlay.setMap(null);
    }
  };
  /**
   * 创建google地图自定义覆盖物
   * @param config
   * @param mapObj
   * @returns {{points: Array}}
   */
  GL.createCustomOverlays = function(config){
    var overlays = [];
    CustomOverlay.prototype = new google.maps.OverlayView();
    CustomOverlay.prototype.onAdd = function () {
      var panes = this.getPanes();
      if(!this._div){
        this._div = this._options && this._options.content || "";
      }
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = this._div;
      this._div = tempDiv;
      panes.overlayImage.appendChild(this._div);
    };
    CustomOverlay.prototype.draw = function (map) {
      // 利用projection获得当前视图的坐标
      var overlayProjection = this.getProjection();
      var point = this._point;
      var center = overlayProjection.fromLatLngToDivPixel(point);
      //
      // 为简单，长宽是固定的，实际应该根据文字改变
      var div = this._div;
      if (div) {
        div.style.left = center.x + ((this._offset && this._offset.x) || 0) + 'px';
        div.style.top = center.y + ((this._offset && this._offset.y) || 0) +  'px';
        div.style.position = 'absolute';
        div.style.padding = "2px";
        var children = div.children[0];
        if (children) {
          children.style.bottom = '0px';
          children.style.left = '0px';
        }
        if(this._callBack){
          var scope = this;
          div.onclick = function(){
            scope._callBack(scope._options);
          };
        }
      } else {
        return;
      }
    };
    CustomOverlay.prototype.setPoint = function (point) {
      if(point instanceof  google.maps.LatLng){
        this._point = point;
      }
    };
    CustomOverlay.prototype.open = function(mapObj,point){
      if(!this._map && !mapObj){
        return false;
      }
      if((point instanceof  google.maps.LatLng)){
        this._point = point;
      }
      if(!this._map){
        overlay.setMap(mapObj);
      }else{
        overlay.setMap(this._map);
      }
    };
    CustomOverlay.prototype.onRemove = function () {
      this._div.parentNode.removeChild(this._div);
      this._div = null;
    };
    for (var i = 0,tempConfig; i < config.length; i++) {
      tempConfig = config[i];
      if(tempConfig.isBMap){
        //高德地图进行转换
        var posM = GL.bMapToAMap(tempConfig.lng,tempConfig.lat);
        tempConfig.lng = posM.lng;
        tempConfig.lat = posM.lat;
      }
      var point = new google.maps.LatLng(tempConfig.lat,tempConfig.lng);
      var overlay = new CustomOverlay(point,tempConfig);
      overlays.push(overlay);
    }
    return overlays;
  };

  /**
   * 将百度地图转为高德地图
   * @param lng
   * @param lat
   * @returns {{lng: number, lat: number}}
   */
  GL.bMapToAMap = function(lng,lat){
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = lng - 0.0065,
      y = lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var  theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    return {
      lng : z * Math.cos(theta),
      lat : z * Math.sin(theta),
      isBMap:false
    };
  };

  /**
   * 统一google的注册事件
   * @param obj
   * @param type
   * @param callback
   */
  GL.addEventListener = function(obj,type,callback){
    if(type == "zoom"){
      type = "zoom_changed";
    }
    if(type == "moving"){
      type = "drag";
    }
    if(type == "moveend"){
      type = "dragend";
    }
    if(type == "movestart"){
      type = "dragstart";
    }
    google.maps.event.addListener(obj, type,function(e){
      callback(e);
    });
  };

  /**
   * 根据传入的节点，将地图调整到合适大小
   * @param config
   * @param mapObj
   */
  GL.fitBounds = function(config,mapObj){
    if(!(config instanceof Array)){
      config = [config];
    }
    var bounds = new google.maps.LatLngBounds();
    for(var i= 0; i<config.length; i++){
      var point = config[i];
      if(point instanceof google.maps.LatLng){
        bounds.extend(point);
      }
    }
    mapObj.fitBounds(bounds);
  };

  /**
   * 获取缩放值
   * @param mapObj
   */
  GL.getZoom = function(mapObj){
    if(!mapObj){
      return false;
    }
    return mapObj.getZoom();
  };

  /**
   * 获取地图中心点
   * @param mapObj
   * @returns {*}
   */
  GL.getCenter = function(mapObj){
    if(!mapObj){
      return false;
    }
    var point = mapObj.getCenter();
    return {
      lng : point.lng(),
      lat : point.lat(),
      isBMap : false
    };
  };

  /**
   * 设置地图中心点
   * @param mapObj
   * @returns {*}
   */
  GL.setCenter = function(point,mapObj){
    if(!(point instanceof google.maps.LatLng) || !mapObj){
      return false;
    }
    mapObj.setCenter(point);
  };
  /**
   * 根据所传坐标，返回对应的百度地图点对象
   * @param points
   */
  GL.createPoints = function(points){
    var pos = [];
    for(var i= 0,point; i<points.length; i++){
      point = points[i];
      if(!point.lng || !point.lat){
        continue;
      }
      if(point.isBMap){
        //高德地图进行转换
        var posM = GL.bMapToAMap(point.lng,point.lat);
        point.lng = posM.lng;
        point.lat = posM.lat;
      }
      pos.push(new google.maps.LatLng(point.lat,point.lng));
    }
    return pos;
  };

  /**
   * 获取两点间的距离
   * @param pointFrom
   * @param pointTo
   * @param map
   * @returns {*}
   */
  GL.getDistance = function(pointFrom,pointTo){
    if(!pointFrom || !pointTo ){
      return false;
    }
    if(typeof google != "undefined" && google.maps.geometry && google.maps.geometry.spherical && google.maps.geometry.spherical.computeDistanceBetween){
      return google.maps.geometry.spherical.computeDistanceBetween(pointFrom,pointTo);
    }
    return false;
  };

  /**
   * 获取地图现实的边缘
   * @param mapObj
   */
  GL.getBounds = function(mapObj){
    if(!mapObj){
      return false;
    }
    var bounds = mapObj.getBounds();
    if(bounds){
      var pointSW = bounds.getSouthWest();
      var pointNE = bounds.getNorthEast();
      return {
        SW:{
          lng : pointSW.lng(),
          lat : pointSW.lat(),
          isBMap : false
        },
        NE:{
          lng : pointNE.lng(),
          lat : pointNE.lat(),
          isBMap : false
        }
      };
    }
  };

  /**
   * 判断地图是否包含某个点
   * @param point
   * @param map
   */
  GL.containsPoint = function(point,map){
    if(!(point instanceof google.maps.LatLng) || !map){
      return;
    }
    var bounds = map.getBounds();
    return bounds.contains(point);
  };
  /**
   * 将地图平移到某个点
   * @param point
   * @param mapObj
   */
  GL.panTo = function(point,mapObj){
    if(!point || !mapObj){
      return false;
    }
    if(point instanceof google.maps.LatLng){
      mapObj.panTo(point);
    }
  };
  return GL;
});