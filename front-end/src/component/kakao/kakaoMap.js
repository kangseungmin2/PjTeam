import React, { useEffect, useState } from 'react';

const { kakao } = window;

const branchesData = [
  {
    name: '우리은행 본점',
    address: '서울특별시 마포구 백범로 23 3층',
    latitude: 37.5526469,
    longitude: 126.9377516,
  },
  {
    name: '우리은행 종훈점',
    address: '서울특별시 강북구 인수봉로8길',
    latitude: 37.62242,
    longitude: 127.0137,
  },
  {
    name: '우리은행 석준점',
    address: '서울특별시 강서구 마곡중앙로 161-1',
    latitude: 37.5678790,
    longitude: 126.8274685,
  },
  // 추가 지점 데이터
  {
    name: '우리은행 서윤점',
    address: '경기도 고양시 덕양구 동산동',
    latitude: 37.652884,
    longitude: 126.8955640,
  },
  {
    name: '우리은행 승민점',
    address: '제주특별자치도 제주시 서사로 22길-17',
    latitude: 33.5061094,
    longitude: 126.5217698,
  },
  {
    name: '우리은행 상아점',
    address: '경기도 시흥시 신현로 33번길 23',
    latitude: 37.4071653,
    longitude: 126.7843425,
  },
  {
    name: '우리은행 정현점',
    address: '서울특별시 관악구 신림동',
    latitude: 37.4845162,
    longitude: 126.9298932,
  },
  
];

const KakaoMap = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);
  const [infowindows, setInfowindows] = useState([]);
  const [defaultList, setDefaultList] = useState([]); // 추가

  useEffect(() => {
    if (kakao) {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.5, 127.0),
          level: 9,
        };

        const map = new kakao.maps.Map(container, options);
        setMap(map);

        branchesData.forEach((branch) => {
          const markerPosition = new kakao.maps.LatLng(branch.latitude, branch.longitude);

          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);

          const infowindow = new kakao.maps.InfoWindow({
            content: `
            <div style="background: #f0f0f0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            <h3 style="font-size: 16px; margin: 0; padding: 0;">${branch.name}</h3>
            <p style="font-size: 14px; margin: 10px 0; padding: 0;">${branch.address}</p>
          </div>
            `,
          });

          kakao.maps.event.addListener(marker, 'click', () => {
            closeInfowindows();
            infowindow.open(map, marker);
          });

          infowindows.push(infowindow);

          // 추가 - 초기 리스트 데이터 설정
          setDefaultList(branchesData);
        });
      });
    }
  }, []);

  const closeInfowindows = () => {
    infowindows.forEach((infowindow) => {
      infowindow.close();
    });
  };

  const handleSearch = () => {
    if (map && searchKeyword) {
      const service = new kakao.maps.services.Places();

      service.keywordSearch(searchKeyword, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setSearchResults(data);

          data.forEach((result) => {
            const markerPosition = new kakao.maps.LatLng(result.y, result.x);

            const marker = new kakao.maps.Marker({
              position: markerPosition,
            });

            marker.setMap(map);

            const infowindow = new kakao.maps.InfoWindow({
              content: `
                <div style="padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px;">
                  <h3 style="font-size: 16px; margin: 0; padding: 0;">${result.place_name}</h3>
                  <p style="font-size: 14px; margin: 5px 0;">${result.address_name}</p>
                </div>
              `,
            });

            kakao.maps.event.addListener(marker, 'click', () => {
              closeInfowindows();
              infowindow.open(map, marker);
            });

            infowindows.push(infowindow);

            // 추가 - 검색 결과로 업데이트
            setDefaultList(data);
          });
        }
      });
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            width: '200px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            fontSize: '14px',
            padding: '8px 12px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {searchResults.length === 0 ? defaultList.map((result) => (
            <li key={result.id} style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h3 style={{ fontSize: '16px', margin: 0, padding: '10px', backgroundColor: '#e0e0e0', borderBottom: '1px solid #ccc' }}>{result.name}</h3>
              <p style={{ fontSize: '14px', margin: '5px 0', padding: '10px' }}>{result.address}</p>
            </li>
          )) : searchResults.map((result) => (
            <li key={result.id} style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h3 style={{ fontSize: '16px', margin: 0, padding: '10px', backgroundColor: '#e0e0e0', borderBottom: '1px solid #ccc' }}>{result.place_name}</h3>
              <p style={{ fontSize: '14px', margin: '5px 0', padding: '10px' }}>{result.address_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KakaoMap;
