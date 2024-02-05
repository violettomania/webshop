import { useEffect, useRef } from 'react';
import { useLocation, Location } from 'react-router-dom';

const usePrevious = (value: Location): Location | undefined => {
  const ref = useRef<Location>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const useLocationChange = (
  action: (currentLocation: Location, previousLocation: Location) => void
): void => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  useEffect(() => {
    if (prevLocation) {
      action(location, prevLocation);
    }
  }, [action, location, prevLocation]);
};
