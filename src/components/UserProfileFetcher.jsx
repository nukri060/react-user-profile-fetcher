import { useEffect, useState } from "react";

export function UserProfileFetcher() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [refreshTrigger, setTrigger] = useState(false);

    function reset() {
        setTrigger(prev => !prev);
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const res = await fetch("https://randomuser.me/api/");
                const data = await res.json();
                setUserData(data);
                setIsError(false);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []); 

    useEffect(() => {
        if (!refreshTrigger) return; 
        async function fetchData() {
            setIsLoading(true);
            try {
                const res = await fetch("https://randomuser.me/api/");
                const data = await res.json();
                setUserData(data);
                setIsError(false);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [refreshTrigger]);

    if (isLoading) return <div className="loading-spinner"></div>;
    if (isError) return <p className="error-message">Failed to fetch user data. Please try again.</p>;
    if (!userData) return null;

    return (
        <>
            <div className="user-profile">
                <img src={userData.results[0].picture.large} alt="user" />
                <div className="user-info">
                    <p className="user-name">
                        <b>Username: </b> {userData.results[0].login.username}
                    </p>
                    <p className="user-fullname">
                        <b>Fullname: </b>{userData.results[0].name.first} {userData.results[0].name.last}
                    </p>
                    <p className="user-email">
                        <b>Email: </b>{userData.results[0].email}
                    </p>
                </div>
            </div>
            <button onClick={reset}>Fetch New User</button>
        </>
    );
}
