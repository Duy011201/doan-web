export function isEmpty(value: any): boolean {
  if (typeof value === 'string') {
    // Kiểm tra chuỗi
    return !value.trim(); // Trả về true nếu chuỗi là rỗng hoặc chỉ gồm khoảng trắng
  } else if (typeof value === 'object' && value !== null) {
    // Kiểm tra đối tượng hoặc mảng
    return !Object.keys(value).length; // Trả về true nếu không có thuộc tính hoặc phần tử nào
  } else {
    // Trường hợp còn lại, bao gồm mảng rỗng, null và undefined
    return !value; // Trả về true nếu giá trị là null, undefined hoặc mảng rỗng
  }
}

export function isEmail(email: string) {
  return !isEmpty(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPassword(password: string) {
  return !isEmpty(password) && password.length >= 5 && password.length <= 20;
}

export function containsSpecialOrLetter(str: string) {
  // Biểu thức chính quy để kiểm tra xem chuỗi có chứa ký tự đặc biệt hoặc chữ không
  const regex = /[^a-zA-Z0-9]/; // Phát hiện ký tự không phải chữ cái hoặc số

  // Kiểm tra chuỗi
  return regex.test(str);
}

export function containsSpecialCharacter(str: string) {
  // Biểu thức chính quy để kiểm tra ký tự đặc biệt
  const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  // Kiểm tra xem chuỗi có chứa ký tự đặc biệt không
  return regex.test(str);
}

export function saveToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string): string {
  return <string>localStorage.getItem(key);
}

export function removeQuotes(str: string): string {
  return str.replace(/"/g, '');
}

export function trimStringObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // Return the value if it is not an object
  }

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim(); // Trim the string
    } else if (typeof obj[key] === 'object') {
      trimStringObject(obj[key]); // Recurse for nested objects
    }
  }
  return obj;
}
