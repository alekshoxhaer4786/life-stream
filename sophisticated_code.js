// filename: sophisticated_code.js

// This code is a simulation of a bank account management system.
// It involves the creation of classes for bank accounts, transactions, and a bank manager.
// The bank manager can perform various operations on the bank accounts.

class BankAccount {
  constructor(accountNumber, accountHolder, initialBalance) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount) {
    this.balance += amount;
    this.transactions.push(new Transaction('deposit', amount));
  }

  withdraw(amount) {
    if (this.balance - amount >= 0) {
      this.balance -= amount;
      this.transactions.push(new Transaction('withdraw', amount));
    } else {
      console.log('Insufficient balance!');
    }
  }

  getStatement() {
    console.log(`Account Holder: ${this.accountHolder}`);
    console.log(`Account Number: ${this.accountNumber}`);
    console.log(`Balance: ${this.balance}`);
    console.log('Transaction History:');
    this.transactions.forEach(transaction => {
      console.log(`- ${transaction.type}: ${transaction.amount}`);
    });
  }
}

class Transaction {
  constructor(type, amount) {
    this.type = type;
    this.amount = amount;
    this.timestamp = new Date();
  }
}

class BankManager {
  constructor() {
    this.accounts = [];
  }

  createAccount(accountNumber, accountHolder, initialBalance) {
    const account = new BankAccount(accountNumber, accountHolder, initialBalance);
    this.accounts.push(account);
    return account;
  }

  deleteAccount(accountNumber) {
    const index = this.accounts.findIndex(account => account.accountNumber === accountNumber);
    if (index !== -1) {
      this.accounts.splice(index, 1);
      console.log(`Account ${accountNumber} deleted.`);
    } else {
      console.log(`Account ${accountNumber} not found.`);
    }
  }

  findAccount(accountNumber) {
    return this.accounts.find(account => account.accountNumber === accountNumber);
  }

  transferFunds(fromAccountNumber, toAccountNumber, amount) {
    const fromAccount = this.findAccount(fromAccountNumber);
    const toAccount = this.findAccount(toAccountNumber);

    if (fromAccount && toAccount) {
      fromAccount.withdraw(amount);
      toAccount.deposit(amount);
      console.log(`Successfully transferred ${amount} from ${fromAccountNumber} to ${toAccountNumber}.`);
    } else {
      console.log('Invalid account numbers provided.');
    }
  }
}

// Bank Account Management System

const manager = new BankManager();

const account1 = manager.createAccount('1001', 'John Doe', 5000);
const account2 = manager.createAccount('1002', 'Jane Smith', 10000);

account1.deposit(1000);
account2.withdraw(2000);

account1.getStatement();
account2.getStatement();

manager.transferFunds('1001', '1002', 1500);

account1.getStatement();
account2.getStatement();

manager.deleteAccount('1001');
manager.deleteAccount('1003');

account1.getStatement();
account2.getStatement();