
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps'
import { useState } from 'react'

const API_KEY = 'AIzaSyDqNazyZ2KITqbiKJ6E7cX04P9uVGPqQdw'

export function MyMap() {

    const [shops, setShops] = useState([
        { id: 's1', name: 'Zikim', lat: 31.609013677901576, lng: 34.52148726557347 },
        { id: 's2', name: 'Rehovot', lat: 31.8928, lng: 34.8113 }
    ])

    const [mapCenter, setMapCenter] = useState({ lat: 32.0853, lng: 34.7818 })
    const [zoom, setZoom] = useState(8)

    function onSelectShop(lat, lng) {
        setMapCenter({ lat, lng })
        setZoom(15)
    }

    return <APIProvider apiKey={API_KEY} >
        <Map
            style={{ width: '100vw', height: '100vh' }}
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