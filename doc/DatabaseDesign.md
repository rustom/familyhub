# Database Design

## DDL Commands

```sql
CREATE TABLE User (
    userID INT PRIMARY KEY, 
    userName VARCHAR(255), 
    email VARCHAR(255), 
    universityID INT,
    FOREIGN KEY (universityID) REFERENCES University(universityID)
);

CREATE TABLE Family (
    familyID INT PRIMARY KEY,
    leaderID INT, 
    accessType VARCHAR(255),
    serviceName VARCHAR(255),
    FOREIGN KEY (leaderID) REFERENCES User(userID), 
    FOREIGN KEY (serviceName) REFERENCES SubscriptionService(serviceName)
);

CREATE TABLE SubscriptionService (
    serviceName VARCHAR(255) PRIMARY KEY,
    price DECIMAL(10,2),
    maxMembers INT
);

CREATE TABLE University (
    universityID INT PRIMARY KEY, 
    universityName VARCHAR(255), 
    city VARCHAR(255)
);

CREATE TABLE Membership (
    memberID INT, 
    familyID INT,
    memberStatus VARCHAR(255),
    PRIMARY KEY (memberID, familyID),
    FOREIGN KEY (memberID) REFERENCES User(userID),
    FOREIGN KEY (familyID) REFERENCES Family(familyID)
);

CREATE TABLE BankAccount (
    accountName VARCHAR(255), 
    platform VARCHAR(255), 
    userID INT, 
    PRIMARY KEY (accountName, platform), 
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Payment (
    paymentID INT PRIMARY KEY, 
    payerID INT, 
    recipientID INT, 
    amount DECIMAL(10,2), 
    paid BIT, 
    deadline DATE, 
    FOREIGN KEY (payerID) REFERENCES User(userID), 
    FOREIGN KEY (recipientID) REFERENCES User(userID)
);
```