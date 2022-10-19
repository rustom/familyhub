# Database Design

## DDL Commands

```sql
CREATE TABLE User (
    userID INT PRIMARY KEY, 
    userName VARCHAR(255), 
    email VARCHAR(255), 
    universityID VARCHAR(255), 
    FOREIGN KEY (universityID) REFERENCES University(universityID)
);

CREATE TABLE Group (
    groupID INT PRIMARY KEY, 
    leaderID INT, 
    accessType VARCHAR(255),
    subscriptionService VARCHAR(255),
    FOREIGN KEY (leaderID) REFERENCES User(userID), 
    FOREIGN KEY (subscriptionService) REFERENCES SubscriptionService(name)
);

CREATE TABLE SubscriptionService (
    serviceName INT PRIMARY KEY
    price DECIMAL(10,2),
    maxMembers INT
);

CREATE TABLE University (
    universityID INT PRIMARY KEY, 
    universityName VARCHAR(255), 
    city VARCHAR(255)
);

CREATE TABLE Membership(
    memberID INT PRIMARY KEY, 
    groupID INT PRIMARY KEY,
    memberStatus VARCHAR(255),
    FOREIGN KEY (memberID) REFERENCES User(userID),
    FOREIGN KEY (groupID) REFERENCES Group(groupID)
);
```