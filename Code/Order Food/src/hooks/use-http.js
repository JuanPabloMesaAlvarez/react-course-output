import { useState } from 'react';

const useHttp = (baseUrl) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const httpRequest = async (requestConfig, handleData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl}/${requestConfig.resource}`, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: JSON.stringify(requestConfig.body),
            });

            if(!response.ok){
                throw new Error('request failed"');
            }

            const data = await response.json();
            handleData(data);

        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
        finally {
            setIsLoading(false);
        }
    }

    return { isLoading, error, httpRequest }
};

export default useHttp;