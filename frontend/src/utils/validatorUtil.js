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
function validateBookingStatus(status) {
  const regex = /^(Pending|In-Progress|Completed|Cancelled|)$/;
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

function validateStockQuantity(stockQuantity) {
  if (stockQuantity < 0) {
    return false;
  }
  return true;
}

export {
  validatePhoneNumber,
  validateEmail,
  validateString,
  validateBookingStatus,
  validateVehicleDate,
  validateStockQuantity,
};
