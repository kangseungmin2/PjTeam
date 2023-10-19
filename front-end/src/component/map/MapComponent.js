import React, { useEffect } from 'react';

function MapComponent() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey= 6546f956b40df35334ea5e94cd64835e";
        script.async = true;
        script.onload = () => {
            // Kakao Maps API 로드 후 지도 생성 및 표시
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };
            const map = new window.kakao.maps.Map(container, options);
        };
        document.head.appendChild(script);
    }, []);

    return <div id="map" style={{ width: '500px', height: '400px' }}></div>;
}

export default MapComponent;
