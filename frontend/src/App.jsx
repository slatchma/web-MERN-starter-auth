import { useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import './App.css';

const App = () => {
  const { sendRequest } = useFetch();

  useEffect(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api`)
      .then(response => console.log(response))
      .catch(error => console.log(error));

  }, [sendRequest]);

  return (
      <div>Hello world || backend url = {process.env.REACT_APP_BACKEND_URL}</div>
  );
}

export default App;
