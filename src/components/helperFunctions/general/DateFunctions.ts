export const formatDate = (date: number): string => {
    const getDate = new Date(date);
    const year = getDate.getFullYear().toString().slice(-2).padStart(2, "0");
    const month = (getDate.getMonth() + 1).toString().padStart(2, "0");
    const day = getDate.getDate().toString().padStart(2, "0");
    const hours = getDate.getHours().toString().padStart(2, "0");
    const minutes = getDate.getMinutes().toString().padStart(2, "0");
    const seconds = getDate.getSeconds().toString().padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};
