import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * @desc - manage request
 * @return {object} - isloading {bool} : to know state of request - sendRequest {function} : to send the request
 */
const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const activeHttpRequests = useRef([]);

    /**
     * @desc - To send the request. Manages abort's request
     * @param url {string} - for the request
     * @param method {string} - for choose the method
     * @param body {object} - body of request
     * @param header {object} - headers of request
     * @return {promise} response - if the request is good, returns json's response else returns request's error
     */
    const sendRequest = useCallback(async (url, method='GET', body, headers={}) => {
        try {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(body),
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
