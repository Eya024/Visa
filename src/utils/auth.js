// src/utils/auth.js
export const checkLoggedIn = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/auth/me/', {
            credentials: 'include',
        });
        const data = await res.json();
        console.log('checkLoggedIn response data:', data);

        if (data.username !== undefined) {
            return data; // Return the full user object
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error in checkLoggedIn:', error);
        return null;
    }
};