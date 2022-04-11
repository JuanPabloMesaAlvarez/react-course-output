import { useState } from "react";

const getDefaultHeaders = (method) => {
    if (method === 'POST') {
        return { 'Content-type': 'application/json' }
    }

    return { 'Content-Type': 'application/json' };
}

const useHttp = (baseURL) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeHttpRequest = async (requestConfig, responseHandler, errorHandler) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${baseURL}/${requestConfig.resource}`, {
                method: requestConfig.method,
                headers: getDefaultHeaders(requestConfig.method),
                body: requestConfig.body
            });
            if (!response.ok) {
                setError(new Error('Something went wrong!'));
            }

            var data = await response.json();
            responseHandler(data);
        }
        catch (error) {
            setError(error.message);
            errorHandler(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, executeHttpRequest }

};

export default useHttp;