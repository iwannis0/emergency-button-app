const getFullDateDayMonthYear = (date: Date | undefined) => {
  if (date !== undefined && date !== null) {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      (day < 10 ? '0' + day : day) +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      year
    );
  } else {
    return '';
  }
};

const calculateYearsOld = (birthDate: Date) => {
  const dateObj = new Date(birthDate);
  const currentDate = new Date();
  return (
    currentDate.getFullYear() -
    dateObj.getFullYear() -
    (currentDate.getMonth() < dateObj.getMonth() ||
    (currentDate.getMonth() === dateObj.getMonth() &&
      currentDate.getDate() < dateObj.getDate())
      ? 1
      : 0)
  );
};

export const removeTimeDayjs = (date: any) => {
  return date?.toDate()?.setHours(0, 0, 0, 0);
};

export {calculateYearsOld, getFullDateDayMonthYear};
