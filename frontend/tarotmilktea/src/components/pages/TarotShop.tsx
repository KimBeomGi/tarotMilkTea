import React, {useEffect, useState, useSyncExternalStore} from 'react';

import { Outlet, Link, AbortedDeferredError } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import "./TarotShop.css"

declare global {
  interface Window {
    kakao: any;
  }
}

// const {kakao} :any = window

function TarotShop() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth)
  const [browserHeight, setBrowserHeight] = useState<number>(window.innerHeight)

  ////////////////////////////////////////////////////////////////////////////////////
  //  브라우저 사이즈 변경시
  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
      setBrowserHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMapSize = () => {
    if(1024 <= browserWidth){
      setBrowserHeight(window.innerHeight - 145.13)
    }else if (481 <= browserWidth) {
      setBrowserHeight(window.innerHeight - 115.41)
    }else{
      setBrowserHeight(window.innerHeight - 49.36)
    }
  }

  useEffect(() => {
    handleMapSize()
  }, [browserWidth, browserHeight])
  ////////////////////////////////////////////////////////////////////////////////////

  // 카카오 맵 api 적용
  // 지도 중심 위치
  const [defaultLoc, setDefaultLoc] = useState([37.566826, 126.9786567])
  const [gpsLocation, setGpsLocation] = useState([37.566826, 126.9786567])
  const [myLocation, setMyLocation] = useState([37.566826, 126.9786567])

  const [map, setMap] = useState<any>(null) // map 객체를 상태로 관리 react 사용하기위해서
  const [isMapMade, setIsMapMade] = useState<boolean>(false)
  const [tarotMarkers, setTarotMarkers] = useState<any>([])
  const [selectedMarker, setSelectedMarker] = useState<any>(null)
  
  // 테스트중
  const [mapInfo, setMapInfo] = useState({ level: null, lat: null, lng: null });

  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  // let infowindow = new window.kakao.maps.InfoWindow({zIndex:1, removable:true, disableAutoPan:true});
  let customOverlay = new window.kakao.maps.CustomOverlay({
    // map: map,
    clickable: true,
    content: '<div class="customOverlay"><a href="#">Chart</a></div>',
    // position: new window.kakao.maps.LatLng(33.450701, 126.570667),
    xAnchor: 0.5,
    yAnchor: 1,
    zIndex: 3
  });


  // 맵 생성 함수 createMap
  const createMap = () => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options :any
    // let createdMap = new window.kakao.maps.Map(container, options); // 지도 생성
    let createdMap:any

    // 위치 엑세스 허용여부에 따라 변경
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        let locPosition = new window.kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        options = { //지도를 생성할 때 필요한 기본 옵션
          // center: new window.kakao.maps.LatLng(myLocation[0], myLocation[1]), //지도의 중심좌표.
          center: locPosition, //지도의 중심좌표.
          level: 5 //지도의 레벨(확대, 축소 정도)
        };
        createdMap = new window.kakao.maps.Map(container, options);

        // map.setCenter(locPosition)
        createdMap.setCenter(locPosition)
        setGpsLocation([lat, lon])
        setMyLocation([lat, lon])
        setMap(createdMap)
      }, function(error) {
        // 위치 접근이 거부되었을 때 또는 에러가 발생했을 때
        let locPosition = new window.kakao.maps.LatLng(defaultLoc[0], defaultLoc[1]);
        options = { //지도를 생성할 때 필요한 기본 옵션
          center: locPosition, //지도의 중심좌표.
          level: 4 //지도의 레벨(확대, 축소 정도)
        };
        createdMap = new window.kakao.maps.Map(container, options);

        // createdMap.setCenter(locPosition);
        setMyLocation(defaultLoc);
        setMap(createdMap);
      });
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        let locPosition = new window.kakao.maps.LatLng(defaultLoc[0], defaultLoc[1])
        options = { //지도를 생성할 때 필요한 기본 옵션
          center: locPosition, //지도의 중심좌표.
          level: 4 //지도의 레벨(확대, 축소 정도)
        };
        createdMap = new window.kakao.maps.Map(container, options);

        // map.setCenter(locPosition)
        // createdMap.setCenter(locPosition)
        setMyLocation(defaultLoc)
        setMap(createdMap)
    }
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position :any, idx :any, title :any) {
    let marker = new window.kakao.maps.Marker({
      position : position, // 마커의 위치
      title : title,
      clickable:true,
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    tarotMarkers.push(marker);  // 배열에 생성된 마커를 추가합니다
    // setTarotMarkers((prev:any) => [...prev, marker]);

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for ( var i = 0; i < tarotMarkers.length; i++ ) {
      tarotMarkers[i].setMap(null);
    }
    setTarotMarkers([]);
  }


  // // 인포윈도우를 열 함수
  // function markerInfoOpenListener (map :any, marker :any, infowindow :any) {
  //   if(!selectedMarker ||selectedMarker != marker){
  //     infowindow.close();
  //   }
  //   infowindow.open(map, marker);
  //   setSelectedMarker(marker);
  // }
  // 인포윈도우를 닫을 함수
  // function markerInfoCloseListener (infowindow :any) {
  // function markerInfoCloseListener () {
  //   // infowindow.close();
  //   customOverlay.setMap(null)
  // }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces (places :any):any {

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( let i=0; i<places.length; i++ ) {

      // 마커를 생성하고 지도에 표시합니다
      let placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x)
      let marker = addMarker(placePosition, i, places[i].place_name)

      

      // <div class="close" onclick="customOverlay.setMap(null)" title="닫기"></div>
      // <div class="img">
      // <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
      // </div>
      let infoContent = `
        <div class="wrap">
          <div class="info">
            <div class="title">
              ${places[i].place_name}
            </div>
            
            <div class="body">
              <div class="desc">
                <div class="ellipsis">${places[i].road_address_name || '주소 정보 없음'}</div>
                <div class="jibun ellipsis">${places[i].phone || '전화번호 정보 없음'}</div>
                <div><a href="https://map.kakao.com/link/to/${places[i].place_name},${places[i].y},${places[i].x}" target="_blank" class="link">길찾기</a></div>
                <div><a href="https://place.map.kakao.com/${places[i].id}" target="_blank" class="link">상세보기</a></div>
              </div>
            </div>
          </div>
        </div>
      `;
      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'click', function() {
        // // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        // infowindow.setContent(infoContent);
        // infowindow.open(map, marker);
        customOverlay.setMap(map)
        customOverlay.setPosition(placePosition)
        customOverlay.setContent(infoContent)

      });

      const markerInfoCloseListener = () => {
        // infowindow.close();
        customOverlay.setMap(null)
      }
      // window.kakao.maps.event.addListener(map, 'click', () => {markerInfoCloseListener(infowindow)});
      // window.kakao.maps.event.addListener(map, 'dragstart', () => {markerInfoCloseListener(infowindow)});
      window.kakao.maps.event.addListener(map, 'click', () => {markerInfoCloseListener()});
      window.kakao.maps.event.addListener(map, 'dragstart', () => {markerInfoCloseListener()});
    }
  }

  //////////////////////////////////////////////

  // 초기 등록
  useEffect(() => {
    
    createMap()

    //지도 확대 축소시 문제 때문에 return으로 언마운트시 map인 mapContainer를 비워버림
    return () => {
      const mapContainer = document.getElementById('map')
      if(mapContainer){
        mapContainer.innerHTML = '';
      }
      setMap(null)
      // setTarotPositions([])
      removeMarker()
    }
  }, [])
  
  // 지도의 값 변경시 마다 할 행동
  useEffect(() => {
    if(map){
      // 타로 점집 검색하기
      // 위치, 레벨 등이 변경될 때 마다 검색
      let bounds = map.getBounds();
      let swLatlng = bounds.getSouthWest();
      let neLatlng = bounds.getNorthEast();

      // 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      window.kakao.maps.event.addListener(map, 'tilesloaded', function() {             
        
        // 지도 영역정보를 얻어옵니다 
        bounds = map.getBounds();
        
        // 영역정보의 남서쪽 정보를 얻어옵니다 
        swLatlng = bounds.getSouthWest();
        
        // 영역정보의 북동쪽 정보를 얻어옵니다 
        neLatlng = bounds.getNorthEast();

        let sw = new window.kakao.maps.LatLng(swLatlng.Ma, swLatlng.La),
        ne = new window.kakao.maps.LatLng(neLatlng.Ma, neLatlng.La);

        let search_bounds = new window.kakao.maps.LatLngBounds(sw, ne); // 인자를 주지 않으면 빈 영역을 생성한다.

        let places = new window.kakao.maps.services.Places();
        let center = map.getCenter();

        // 검색 결과를 서버에서 받아오는 placesSearchCB()
        let placesSearchCB = function(result :any, status :any) {
          if (status === window.kakao.maps.services.Status.OK) {
            // console.log(result)
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(result);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            // console.log('검색 결과가 존재하지 않습니다.');
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.error('검색 결과 중 오류가 발생했습니다.');
            return;
          }
        };
        
        // 카카오맵 키워드로 검색
        places.keywordSearch('타로', placesSearchCB, {
          // category_group_code : "CE7",
          bounds: search_bounds,
          useMapCenter : true,
          // location : center,
          size : 15,
          // sort: window.kakao.maps.services.SortBy.DISTANCE
        });
      });
      
      //지도 위치 변경에 따른 정보 변경
      window.kakao.maps.event.addListener(map, 'tilesloaded', () => {
        const level = map.getLevel();
        
        const latlng = map.getCenter();

        setMapInfo({
          level,
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        });
        setMyLocation([latlng.getLat(), latlng.getLng()])
      });
    }
    
  }, [map])
  /////////////
  
  /////////////////////////////////////////////////////
  // 지도 중심 좌표 변화 이벤트를 등록한다
  const zoomIn = () => {
    if (map) { // map 객체가 초기화된 경우에만 실행
      map.setLevel(map.getLevel() - 1, {
        animate: {
          duration: 300
        }
      });
    }
  }

  const zoomOut = () => {
    if (map) { // map 객체가 초기화된 경우에만 실행
      map.setLevel(map.getLevel() + 1, {
        animate: {
          duration: 300
        }
      });
    }
  }
  const panTo = () => {
    // 이동할 위도 경도 위치를 생성합니다 
    let moveLatLon = new window.kakao.maps.LatLng(gpsLocation[0], gpsLocation[1]);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
  }    
  /////////////////////////////////////////////////////////
  
    
  return (
    <div className="TarotShop">
      <div id="map" style={{width:browserWidth, height:browserHeight}} className='kakaomap'>
        
      </div>
      <div className="custom_zoomcontrol radius_border"> 
        <span onClick={() => {zoomIn()}}><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"/></span>  
        <span onClick={() => {zoomOut()}}><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"/></span>
      </div>
      <div className="custom_location radius_border">
        <span onClick={() => {panTo()}}><img src={process.env.PUBLIC_URL+"/images/gpsImg.png"} alt="현위치"/></span>
      </div>
      {/* <div>{mapInfo.level !== null && (
        <span>
          <p>지도 레벨은 {mapInfo.level} 이고</p>
          <p>중심 좌표는 위도 {mapInfo.lat}, 경도 {mapInfo.lng}입니다</p>
        </span>
      )}</div> */}
    </div>
  );
}

export default TarotShop;