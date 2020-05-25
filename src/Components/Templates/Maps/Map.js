/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import '../../Pages/Main.css';
import { MapContext } from '../../../ContextAPI/MapContext';
import Overlay from './Overlay';
import Marker from './Marker';
import Level from './Level';
import MapEvent from './MapEvent';

function Map() {
  const { getLocation } = useContext(MapContext);
  const [_map, setState] = useState({});
  const { kakao } = window;
  const mapEvent = kakao.maps.event;

  useEffect(() => {
    // 마운트 될 때 한번만 맵 생성
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.544579, 127.056045),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    const callback = () => {
      const { Ha, Ga } = map.getCenter();
      getLocation(Ha, Ga); // 위도, 경도 상태 변경
    };

    // 맵 드래그 완료 시 3번째 인수로 전달 한 콜백 실행
    mapEvent.addListener(map, 'dragend', callback);
    setState({ map });
  }, []);

  // const panTo = () => {
  //   // 이동할 위도 경도 위치를 생성합니다
  //   const moveLatLon = new kakao.maps.LatLng(33.45058, 126.574942);

  //   // 지도 중심을 부드럽게 이동시킵니다
  //   // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  //   _map.map.panTo(moveLatLon);
  // };

  return (
    <>
      <MapEvent />
      <Marker map={_map.map} />
      <Overlay map={_map.map} />
      <Level map={_map.map} />
      <div id="map" />
    </>
  );
}

export default Map;
