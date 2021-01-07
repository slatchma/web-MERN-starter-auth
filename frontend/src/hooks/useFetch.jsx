import { useState, useCallback, useRef, useEffect } from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method='GET', body=null, headers={}) => {
        try {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
              })
             
            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(requestCtrl => requestCtrl !== httpAbortCtrl);
            if(!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
            

        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    }, [])

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
      }, []);

    return {isLoading, sendRequest};
}

export { useFetch };