export const parseDate = (miliseconds) => {
    const date = new Date(Number.parseInt(miliseconds));
    const formatDate = `${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}/${date.getMonth() >= 10 ? date.getMonth() : `0${date.getMonth()}`}/${date.getFullYear()}      ${date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`}H${date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`}`;
    return formatDate;
}