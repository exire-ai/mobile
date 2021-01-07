const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    12: 'December'
};

module.exports = class DateFormatter {
    constructor() {}

    unixToDate = (timestamp) => {
        let date = new Date(timestamp * 1000);

        let month = date.getMonth();
        let day = date.getDate();

        return months[month] + ' ' + day;
    };

    unixToTime = (timestamp) => {
        let date = new Date(timestamp * 1000);
        let hour = this.formattedHour(date.getHours());
        return hour;
    };

    getCurrentDate = () => {
        let today = new Date();
        let dd = today.getDate();

        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '-' + dd + '-' + yyyy;
        return today;
    };

    formattedHour = (hour) => {
        //TODO Generate This based on Locale in future
        let timezone = '(EDT)';
        let suffix = 'AM';
        if (hour >= 12) {
            suffix = 'PM';
            if (hour != 12) {
                hour -= 12;
            }
        }
        return hour + ' ' + suffix + ' ' + timezone;
    };

    formattedDate = (dateString) => {
        let day = this.getDayOfWeek(dateString);
        let month = months[dateString.substring(5, 7)];
        let year = dateString.substring(0, 4);
        return day + ' ' + month + ' ' + year;
    };

    // Accepts a Date object or date string that is recognized by the Date.parse() method
    getDayOfWeek = (date) => {
        const dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek)
            ? null
            : [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday'
              ][dayOfWeek];
    };
};
