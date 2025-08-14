function getCookieHype(key, type) {

    if (type == 'gtm_purchase') {
        return "yes";
    }

    try {
        const cookies = document.cookie
        .split(";")
        .reduce(
            (ac, cv, i) =>
            Object.assign(ac, { [cv.split("=")[0].trim()]: cv.split("=")[1] }),
            {}
        )["cookiehype-consent"];
        const { [key]: value } = cookies
        .split(",")
        .reduce(
            (obj, pair) => (
            (pair = pair.split(":")), (obj[pair[0]] = pair[1]), obj
            ),
            {}
        );
        return value;
    } catch (error) {
        console.log(error);
        return "yes";
    }
    
}