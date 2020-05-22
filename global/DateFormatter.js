const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

module.exports = class DateFormatter {
  constructor() {}
  getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "-" + dd + "-" + yyyy;
    return today;
  };

  formattedHour = (hour) => {
    //TODO Generate This based on Locale in future
    var timezone = "(EDT)";
    var suffix = "AM";
    if (hour >= 12) {
      suffix = "PM";
      if (hour != 12) {
        hour -= 12;
      }
    }
    return hour + " " + suffix + " " + timezone;
  };

  formattedDate = (dateString) => {
    var day = this.getDayOfWeek(dateString);
    var month = months[dateString.substring(5, 7)];
    var year = dateString.substring(0, 4);
    return day + " " + month + " " + year;
  };

  // Accepts a Date object or date string that is recognized by the Date.parse() method
  getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];
  };
};
