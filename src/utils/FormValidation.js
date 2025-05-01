export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  //   const cleaned = phone.replace(/[^0-9]/g, "");
  const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  return regex.test(phone);
};

export const isRequiredData = (value) =>{
  return value;
}