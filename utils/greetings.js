export const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
        return "Good Morning";
    } else if (currentTime < 16) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
};