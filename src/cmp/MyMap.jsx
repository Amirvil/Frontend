
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps'
import { useState } from 'react'

const API_KEY = 'AIzaSyDqNazyZ2KITqbiKJ6E7cX04P9uVGPqQdw'

export function MyMap() {

    const [shops, setShops] = useState([
        { id: 's1', name: 'Zikim', lat: 31.609013677901576, lng: 34.52148726557347 },
        { id: 's2', name: 'Rehovot', lat: 31.8928, lng: 34.8113 }
    ])

    // Calculate center between the two markers
    const centerLat = (31.609013677901576 + 31.8928) / 2  // 31.75
    const centerLng = (34.52148726557347 + 34.8113) / 2   // 34.666

    const [mapCenter, setMapCenter] = useState({ lat: centerLat, lng: centerLng })
    const [zoom, setZoom] = useState(10)  // zoom out a bit to see both markers

    function onSelectShop(lat, lng) {
        setMapCenter({ lat, lng })
        setZoom(15)
    }

    return <APIProvider apiKey={API_KEY} >
        <Map
            style={{ width: '100%', height: '100%' }}
            center={mapCenter}
            zoom={zoom}

            onCameraChanged={(ev) => {
                setMapCenter(ev.detail.center)
                setZoom(ev.detail.zoom)
            }}
            gestureHandling='cooperative'
            disableDefaultUI={false}>

            {shops.map(shop => (
                <Marker
                    key={shop.id}
                    position={{ lat: shop.lat, lng: shop.lng }}
                    title={shop.name}
                    onClick={() => onSelectShop(shop.lat, shop.lng)}
                />
            ))}
        </Map>

    </APIProvider>
}