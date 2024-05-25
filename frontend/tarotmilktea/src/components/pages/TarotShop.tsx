import React, {useEffect, useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import "./TarotShop.css"
import gpsImage from "../../assets/images/gpsImg.png"

declare global {
  interface Window {
    kakao: any;
  }
}

const {kakao} :any = window

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
  const [defaultLoc, setDefaultLoc] = useState([33.450701, 126.570667])
  const [gpsLocation, setGpsLocation] = useState([33.450701, 126.570667])
  const [myLocation, setMyLocation] = useState([33.450701, 126.570667])

  const [map, setMap] = useState<any>(null); // map 객체를 상태로 관리 react 사용하기위해서
  // 테스트중
  const [mapInfo, setMapInfo] = useState({ level: null, lat: null, lng: null });


  // 초기 등록
  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(myLocation[0], myLocation[1]), //지도의 중심좌표.
      // center: new kakao.maps.LatLng(0, 0), //지도의 중심좌표.
      level: 4 //지도의 레벨(확대, 축소 정도)
    };
    // let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    let createdMap = new window.kakao.maps.Map(container, options); // 지도 생성
    setMap(createdMap)

    // map.setDraggable(false)
    // map.setZoomable(false)
    

    // 위치 엑세스 허용여부에 따라 변경
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
          
          let lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
          
          let locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          // map.setCenter(locPosition)
          createdMap.setCenter(locPosition)
          setGpsLocation([lat, lon])
          setMyLocation([lat, lon])
        });
        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        let locPosition = new kakao.maps.LatLng(defaultLoc)
        // map.setCenter(locPosition)
        createdMap.setCenter(locPosition)
        setMyLocation(defaultLoc)
    }

    window.kakao.maps.event.addListener(createdMap, 'center_changed', () => {
      const level = createdMap.getLevel();
      const latlng = createdMap.getCenter();

      setMapInfo({
        level,
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      });
      setMyLocation([latlng.getLat(), latlng.getLng()])
    });
    
    /////////// 지도 확대 축소시 문제 때문에 return으로 언마운트시 container를 비워버림
    return () => {
      if(container){container.innerHTML = '';}
    }
  }, [])
  
  /////////////////////////////////////////////////////
  // 지도 중심 좌표 변화 이벤트를 등록한다
  const zoomIn = () => {
    if (map) { // map 객체가 초기화된 경우에만 실행
      map.setLevel(map.getLevel() - 1);
    }
  }

  const zoomOut = () => {
    if (map) { // map 객체가 초기화된 경우에만 실행
      map.setLevel(map.getLevel() + 1);
    }
  }
  const panTo = () => {
    // 이동할 위도 경도 위치를 생성합니다 
    let moveLatLon = new kakao.maps.LatLng(gpsLocation[0], gpsLocation[1]);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
  }    
  /////////////////////////////////////////////////////////
  
    
  return (
    <div className="TarotShop">
      <div id="map" style={{width:browserWidth, height:browserHeight}} className='kakaomap'></div>
      <div className="custom_zoomcontrol radius_border"> 
        <span onClick={() => {zoomIn()}}><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"/></span>  
        <span onClick={() => {zoomOut()}}><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"/></span>
      </div>
      <div className="custom_location radius_border">
        <span onClick={() => {panTo()}}><img src={gpsImage} alt="현위치"/></span>
      </div>
      <div>{mapInfo.level !== null && (
        <span>
          <p>지도 레벨은 {mapInfo.level} 이고</p>
          <p>중심 좌표는 위도 {mapInfo.lat}, 경도 {mapInfo.lng}입니다</p>
        </span>
      )}</div>
    </div>
  );
}

export default TarotShop;
