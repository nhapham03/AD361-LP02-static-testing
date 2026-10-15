// Program requirements:
// - A user can withdraw funds.
// - A user can deposit funds.
// - A user's balance should never become negative.
// - A PIN must be provided during every action.

const USER = "Rose Thecat";
// should be let or var. const does not allow for reassignment
const BALANCE = [15, 983]; // should be a number not an array
const USER_PIN = 1234;

// Deposits money into a user's account.
export function deposit(pin: number, balance: number) { 
  // assuming balance is the amount to be deposited, renamng to amount would be clearer
  // check if balance is positve cannot add a negative amount to balance
  if (pin === USER_PIN) {
    balance = BALANCE + balance; // BALANCE should be the one being updated not the parameter balance
    
    return BALANCE;
  } else {
    console.log("Incorrect PIN");
  }
}

// Withdraws money from a user's account.
// should be withdrawal not withdrawl
export function withdrawl(pin: number, amount: number) {
  // should be cheking if amount is greater than balance and that its a psitive number
  if (pin === USER_PIN) {
    //again BALANCE isnt being updated
    balance = BALANCE + balance; // should be subtracting amount from BAlANCE. balance does not exist in this function 
    
    console.log(BALANCE);
    return BALANCE;
  } else {
    console.log("Incorrect PIN");
  }
}

// Returns the account balance.
export function balanceCheck() {
  return BALANCE;
  console.log(`Your balance is ${BALANCE}`); // should be before return statement
}

// Transfers money to another user's account and withdraws it from the account.
export function transfer(pin: number, amount: number, reciver: string) {
  // doesnt check pin or if amount is greater than balance doesnt check if amount is positive
  const transferAmount = withdrawl(amount); // withdrawl function expects in and amount
  console.log(`Success! ${amount} was transferred to ${reciver}`);
  return balanceCheck; // should be balanceCheck() to call the function
}

// AI transparency: AI was used to clean up this code.
