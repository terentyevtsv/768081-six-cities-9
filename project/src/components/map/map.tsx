import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { PIN_HEIGHT, PIN_WIDTH, URL_PIN_CURRENT, URL_PIN_DEFAULT } from '../../const';
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
  const halfWidth = 0.5 * PIN_WIDTH;

  if (selectedOffer !== null) {
    if (selectedOffer.id === offer.id) {
      icon = new Icon({
        iconUrl: URL_PIN_CURRENT,
        iconSize: [PIN_WIDTH, PIN_HEIGHT],
        iconAnchor: [halfWidth, PIN_HEIGHT],
      });
      return icon;
    }
  }

  icon = new Icon({
    iconUrl: URL_PIN_DEFAULT,
    iconSize: [PIN_WIDTH, PIN_HEIGHT],
    iconAnchor: [halfWidth, PIN_HEIGHT],
  });

  return icon;
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
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
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
  }, [map, offers, selectedOffer]);

  return (
    <section
      className={className}
      ref={mapRef}
    >
    </section>
  );
}

export default  Map;
