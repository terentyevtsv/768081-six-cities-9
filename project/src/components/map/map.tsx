import { Icon, Map as LeafLetMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { PinSize, PinURL } from '../../const';
import useMap from '../../hooks/use-map';
import { City, Offer } from '../../types/offer';

type MapProps = {
  city: City,
  offers: Offer[],
  selectedOffer: Offer | null,
  className: string,
};

// Получение иконки пина в записимости от текущего предложения
const getIcon = (selectedOffer: Offer | null, offer: Offer) => {
  let icon: Icon;
  const halfWidth = 0.5 * PinSize.Width;

  if (selectedOffer !== null) {
    if (selectedOffer.id === offer.id) {
      icon = new Icon({
        iconUrl: PinURL.Current,
        iconSize: [PinSize.Width, PinSize.Height],
        iconAnchor: [halfWidth, PinSize.Height],
      });
      return icon;
    }
  }

  icon = new Icon({
    iconUrl: PinURL.Default,
    iconSize: [PinSize.Width, PinSize.Height],
    iconAnchor: [halfWidth, PinSize.Height],
  });

  return icon;
};

const setView = (map: LeafLetMap, city: City): void => {
  const { latitude, longitude, zoom } = city.location;
  map.setView({
    lat: latitude,
    lng: longitude,
  }, zoom);
};

const markers: Marker[] = [];

function Map({
  city,
  offers,
  selectedOffer,
  className,
}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if (map) {
      setView(map, city);
      offers.forEach((offer) => {
        const { latitude, longitude } = offer.location;
        const marker = new Marker({
          lat: latitude,
          lng: longitude,
        });
        const icon = getIcon(selectedOffer, offer);

        marker
          .setIcon(icon)
          .addTo(map);
        markers.push(marker);
      });
    }
    return () => {
      markers.forEach((marker) => marker.remove());
      markers.length = 0;
    };
  }, [city, map, offers, selectedOffer]);

  return (
    <section
      className={className}
      ref={mapRef}
    >
    </section>
  );
}

export default  Map;
