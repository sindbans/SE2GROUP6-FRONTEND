export const getUserLocation = () =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
                localStorage.setItem("userLocationCoords", coords);
                resolve(coords);
            },
            (err) => reject(err)
        );
    });
