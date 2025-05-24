

class BaseHelper {
  
  static excludeMatchingItems<T, K extends keyof T>(
    array: T[] | undefined,
    key: K,
    value: T[K] | undefined
  ): T[] | undefined {
    return array?.filter((item) => item[key] !== value);
  }

  static capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  static getUserInitials(fullName: string) {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join('');
  }

  

  static formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  static formatTimestamp(timestamp: string) {
    let date = new Date(timestamp);

    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    let amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    return `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes}:${seconds}${amPm}`;
  }

  
}

export default BaseHelper;
