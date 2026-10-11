// Program requirements:
// - A user can withdraw funds.
// - A user can deposit funds.
// - A user's balance should never become negative.
// - A PIN must be provided during every action.

const USER = "Rose Thecat"; // variable is unsued, make it so it welcomes the user once "logged in"
let BALANCE = 15983;
const USER_PIN = 1234;

// Deposits money into a user's account.
export function deposit(pin: number, amount: number) {
  if (pin === USER_PIN && Number.isFinite(amount) && amount > 0) {
    BALANCE += amount;
    console.log(BALANCE);
    return BALANCE;
  } else if (!Number.isFinite(amount) || amount <= 0) {
    console.log("Invalid Amount, Please Try Again.");
  } else {
    console.log("Incorrect PIN");
  }
}

// Withdraws money from a user's account.
export function withdrawal(pin: number, amount: number) {
  if (
    pin === USER_PIN &&
    Number.isFinite(amount) &&
    amount > 0 &&
    amount <= BALANCE
  ) {
    BALANCE -= amount;
    console.log(BALANCE);
    return BALANCE;
  } else if (amount > BALANCE && Number.isFinite(amount)) {
    console.log("Insufficient Funds.");
  } else if (!Number.isFinite(amount) || amount <= 0) {
    console.log("Invalid Amount, Please Try Again.");
  } else {
    console.log("Incorrect PIN");
  }
}

// Returns the account balance.
export function balanceCheck(pin: number) {
  if (USER_PIN === pin) {
    console.log(`Your balance is ${BALANCE}`);
    return BALANCE;
  } else {
    console.log("Incorrect PIN");
  }
}

// Transfers money to another user's account and withdraws it from the account.
export function transfer(pin: number, amount: number, reciver: string) {
  if (
    pin === USER_PIN &&
    Number.isFinite(amount) &&
    amount > 0 &&
    amount <= BALANCE
  ) {
    withdrawal(pin, amount);
    console.log(`Success! ${amount} was transferred to ${reciver}`);
    return BALANCE;
  } else if (!Number.isFinite(amount) || amount <= 0 || amount > BALANCE) {
    console.log("Amount Invalid.");
  } else {
    console.log("Incorrect PIN");
  }
}

// AI transparency: AI was used to clean up this code.
