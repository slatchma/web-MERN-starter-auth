import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from './hooks/useFetch';
import './App.css';

const MessageTranslation = () => {
  const { t } = useTranslation();

  return <p>{t('hello world')}</p>;
};


const App = () => {
  const { sendRequest } = useFetch();

  useEffect(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api`)
      .then(response => console.log(response))
      .catch(error => console.log(error));

  }, [sendRequest]);

  return (
      <div>
      <MessageTranslation />
        <p>backend url = {process.env.REACT_APP_BACKEND_URL}</p>
      </div>
  );
}

export default App;
