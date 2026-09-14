// Phone number
function validatePhoneNumber(phoneNumber) {
  const regex = /^(0|\+)\d{1,15}$/;
  return regex.test(phoneNumber);
}

// Email
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Part number
function validateString(partNumber) {
  const regex = /^[a-zA-Z0-9 ]+$/;
  return regex.test(partNumber);
}

// Status validation
function validatePartStatus(status) {
  const regex = /^(Available|Ordered|Requested|)$/;
  return regex.test(status);
}

// min and max vehicle date
function validateVehicleDate(date) {
  const currentYear = new Date().getFullYear();
  const maxFutureYear = currentYear + 1; // Allows for next year's models
  const minYear = 1886; // first car released

  if (date >= minYear && date <= maxFutureYear) {
    return true;
  }
  return false;
}

module.exports = {
  validatePhoneNumber,
  validateEmail,
  validateString,
  validatePartStatus,
  validateVehicleDate,
};
