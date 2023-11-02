import { useEffect, useState } from "react";

export default function useAddress() {
    const [address, setAddress] = useState("");
    const [userPosition, setUserPosition] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUserPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userPosition.lat}&lon=${userPosition.lng}&addressdetails=1`
                );
                const data = await response.json();
                setAddress(data.display_name);
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };
        if (userPosition.lat && userPosition.lng) {
            fetchData();
        }
    }, [userPosition]);
    return { address, userPosition }
}