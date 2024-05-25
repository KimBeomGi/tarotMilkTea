import React, {useEffect, useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'

declare global {
  interface Window {
    kakao: any;
  }
}

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
  const {kakao} :any = window

  // 지도 중심 위치
  const [defaultLoc, setDefaultLoc] = useState([[33.450701, 126.570667]])
  const [gpsLocation, setGpsLocation] = useState([33.450701, 126.570667])
  const [myLocation, setMyLocation] = useState([33.450701, 126.570667])

  // 초기 등록
  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(gpsLocation[0], gpsLocation[1]), //지도의 중심좌표.
      level: 4 //지도의 레벨(확대, 축소 정도)
    };
    console.log('현재위치찾기2')

    let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // map.setDraggable(false)
    // map.setZoomable(false)
    /////////////////////////////////////////////////////////
    // 위치 엑세스 허용여부에 따라 변경
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
          
          let lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
          
          let locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          map.setCenter(locPosition)
          setGpsLocation([lat, lon])
        });
        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        let locPosition = new kakao.maps.LatLng(defaultLoc[0], defaultLoc[1])
        map.setCenter(locPosition)
    }
  
    /////////////////////////////////////////////////////////
  }, [])

  
  return (
    <div className="TarotShop">
      <div id="map" style={{width:browserWidth, height:browserHeight}} className='kakaomap'></div>
    </div>
  );
}

export default TarotShop;
