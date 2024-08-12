export const roundedFollowers = (followers) => {
    if (followers >= 1000000) {
        return `${Math.floor(followers / 1000000)}M`;
    } else if (followers >= 1000) {
        return `${Math.floor(followers / 1000)}K`;
    } else {
        return `${followers}`;
    }
}