function getRelativeTimeString(dateString) {
    const updateDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - updateDate);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'updated today';
    if (days === 1) return 'updated yesterday';
    if (days < 7) return `updated ${days} days ago`;
    if (days < 30) {
        const weeks = Math.floor(days / 7);
        return `updated ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    if (days < 365) {
        const months = Math.floor(days / 30);
        return `updated ${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    const years = Math.floor(days / 365);
    return `updated ${years} ${years === 1 ? 'year' : 'years'} ago`;
}

module.exports = { getRelativeTimeString };
