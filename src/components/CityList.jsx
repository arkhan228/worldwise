import styles from './CityList.module.css';
import Spinner from '../components/Spinner';
import CityItem from './CityItem';
import Message from '../components/Message';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';

function CityList() {
  const { cities, isLoading, error, resetError } = useCities();

  // Error handling
  useEffect(() => {
    const timer = setTimeout(() => resetError(), 3000);
    return () => clearTimeout(timer);
  }, [resetError]);

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
