/**
 * Converts a date string to a human-readable relative time string
 * @param {string} dateString - ISO date string to convert
 * @returns {string} Human-readable relative time (e.g., "updated 2 days ago")
 */
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

/**
 * Gets the current date in Pacific Time (Los Angeles timezone)
 * @returns {Date} Current date in Pacific Time
 */
function getPacificTime() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
}

/**
 * Formats a date for display in mortgage/appointment cards
 * @param {string|Date} dateInput - Date to format
 * @returns {Object} Object containing formatted month and day
 */
function formatCardDate(dateInput) {
    const date = new Date(dateInput);
    return {
        month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
        day: date.getDate()
    };
}

/**
 * Gets date ranges for mortgage renewal categories
 * @param {Date} currentDate - Base date to calculate from
 * @returns {Object} Object containing date ranges for different periods
 */
function getMortgageRenewingRanges(currentDate) {
    const ranges = {
        '30Days': { start: 0, end: 30 },
        '60Days': { start: 31, end: 60 },
        '90Days': { start: 61, end: 90 },
        '180Days': { start: 91, end: 180 }
    };

    const result = {};
    Object.keys(ranges).forEach(key => {
        const startDate = new Date(currentDate);
        const endDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() + ranges[key].start);
        endDate.setDate(currentDate.getDate() + ranges[key].end);
        result[key] = { startDate, endDate };
    });

    return result;
}

/**
 * Gets week date ranges for appointment scheduling
 * @param {Date} currentDate - Base date to calculate from
 * @param {number} weeksFromNow - Number of weeks from current date
 * @returns {Object} Object containing start and end dates of the week
 */
function getWeekDates(currentDate, weeksFromNow) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + (weeksFromNow * 7));
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Set to Sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday
    return { start: startOfWeek, end: endOfWeek };
}

/**
 * Filters items by date range
 * @param {Array} items - Array of items with date property
 * @param {Date} startDate - Start date for filtering
 * @param {Date} endDate - End date for filtering
 * @returns {Array} Filtered array of items
 */
function filterItemsByDateRange(items, startDate, endDate) {
    return items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });
}

/**
 * Calculates appointment statistics from appointment data
 * @param {Array} appointmentData - Array of appointment data objects
 * @returns {Object} Object containing total appointments and max count
 */
function calculateAppointmentStats(appointmentData) {
    return appointmentData.reduce(
        (acc, item) => ({
            totalAppointments: acc.totalAppointments + item.Count,
            maxCount: Math.max(acc.maxCount, item.Count)
        }),
        { totalAppointments: 0, maxCount: 0 }
    );
}

module.exports = { 
    getRelativeTimeString,
    getPacificTime,
    formatCardDate,
    getMortgageRenewingRanges,
    getWeekDates,
    filterItemsByDateRange,
    calculateAppointmentStats
};
