import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCities } from '../contexts/CitiesContext';
import styles from './City.module.css';
import Spinner from './Spinner';
import BackButton from './BackButton';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  const navigate = useNavigate();
  const { getCity, currentCity, isLoading, error } = useCities();
  const { id } = useParams();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  // Navigate back to the cities list if there was an error
  useEffect(() => {
    if (error)
      navigate('/app/cities', {
        replace: true,
      });
  }, [error, navigate]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
