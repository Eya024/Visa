export const checkLoggedIn = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/auth/me/', {
            credentials: 'include', // Ensure the session cookie is sent with the request
        });
        const data = await res.json();
        console.log('checkLoggedIn response data:', data);  // Log the data to check the response
        
        return data.username !== undefined;  // Check if the user data contains a valid username
    } catch (error) {
        console.error('Error in checkLoggedIn:', error);
        return false;
    }
};
