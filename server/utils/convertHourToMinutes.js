module.exports = function convertHourToMinutes(element){
    const [hour, minutes] = element.split(':').map(Number);
    const timeInMinutes = (hour*60) + minutes;
    return timeInMinutes;
}