# CS 411 Project Proposal

# Title: FamilyHub

## Summary

FamilyHub acts as a one-stop shop that enables students across UIUC to find and join fellow classmates who are interested in starting a family plan subscription together. Numerous streaming services like Netflix, HBO Max, and Spotify offer family plans that come at the fraction of price of their corresponding individual plans. FamilyHub aims to connect like-minded students who aren’t able to find group-mates and enable everyone to reap the savings of joining a family plan.

When interacting with FamilyHub, users can either create a new family plan or join an existing family plan on a specified streaming service like Netflix. Each group is composed of a host and fellow group-mates who can either join the family plan immediately or request entry from the host. Once the plan has reached its desired or maximum capacity, FamilyHub closes the group and acts a centralized platform for the group to manage their family plan and facilitate monthly transactions to the group host.

## Description

FamilyHub is an online platform that connects people who are looking to register for a family plan at one of the big streaming service companies (e.g. Netflix, Spotify, Disney+), but don’t have enough friends and family members for a full group. Oftentimes, users who are seeking to join a family plan will reach out to their friends. However, existing plans might already be full or the group might not have enough members to merit the financial incentives of splitting the cost. By crowdsourcing this effort across campus, FamilyHub aims to expand the reach of individuals looking to create or join family plans to ultimately maximize savings.

After signing up, users can either choose to host a family plan (most memberships require one member to be the payment provider) and invite new members, or join other members’ families. Once the family has the maximum number of members, each member will be reducing their respective costs as much as possible. After the plan has been created, FamilyHub will help facilitate the payments system by outlining who has to pay who on a recurring deadline system (monthly or yearly). We will also enable hosts to manage their groups, such as removing an inactive member who hasn’t met their payment responsibilities. 

## Usefulness

This product helps people save money on media subscriptions like Spotify, Netflix, HBO Max, etc by helping people find others on campus to form group plans. For context, the individual plan for Spotify Premium costs $10/month and the student plan costs $5/month. Alternatively, the family plan for Spotify Premium costs $16/month and supports up to 6 people, coming out to $2.67/person. By joining a full family plan, individuals can save 73% compared to the base plan and 47% compared to the student plan. 

Currently, family plans are mostly organized and facilitated informally through friend groups, social media, and group chats. However, this informal system leads to the common issues of existing family plans being closed or not having enough people to fill out a family plan. FamilyHub seeks to remedy these situations by opening up potential groups to a great population of members and streamline this process of creating and managing family plans.

Based on our market research, there doesn’t seem to be any direct competitors that offer this streamlined service of hosting or joining family plans. Like we mentioned, this process is mostly conducted informally so we hope to simplify and coordinate the matching system for creating family plans. Rather than scalping profit for ourselves (although that is a possible extension), the purpose of the platform is to facilitate communication. The platform allows people who have a desire to collaborate to find each other. 

The website will be targeted towards UIUC students to keep the scope local. By keeping the product on campus, we can also maintain the reputability of our platform by ensuring people that their classmates will be more likely to fulfill their payment responsibilities. From our personal experience at college, there’s high demand for people to join group plans for streaming services, and our product will help facilitate this.

## Realness

Most of the data for our project does not come from an existing database. Some of the data will have to be filled in manually, such as the list of streaming services that we support and the prices of the individual and group plans at those services. However, the bulk of our user data will come from new users themselves (which will be artificially simulated until we have real users). 

The user data will include user IDs, names, and emails (no passwords, as we will be using external auth). On the group level, we will store the group IDs, group leaders, and group members for each family, as well as the maximum number of members of the family. 

On the relational level, we will store data concerning the invite requests and approvals for joining a group. New members of a group will have to submit a request on the group page to join the group, and the group leader will be able to approve or reject these requests. The group leader can also choose to remove an existing member from their group. 

On the payment level, we will store data on whether or not the members of a group have been paying their group leader, and when the deadline for their payment is. Different payment services may have different pay schedules, so family members will be able to log in to the platform and check the deadline and amount of their payment. Leaders will be able to mark whether each member of their group has successfully paid for the month. 

The data described above will constitute a minimum of 5 tables. Depending on the additional features we decide to build out, we may require additional tables or views. 

## Functionality

The major pieces of functionality that FamilyHub will support are generating and signing into accounts, creating new family plan group, searching for desired family plans, joining or requesting entry to a family plan, managing group mates (such as removing an inactive member), and outlining/tracking payments to the plan host.

To create an account, we will attempt to allow users to create and sign into their account through their University of Illinois account by interfacing with the Shibboleth identification service API. In case we are not able to get the Shibboleth API working, we can implement Google OAuth, which is simpler. We will store this account information (user id, name, email) in the Users table that we outlined in the previous table.

On the groups page, there will be a button that allows users to create a new group. On the create group page, users will have to specify the streaming service that they want to use, the payment type (e.g. Venmo, Zelle), and their payment account identifier (i.e. their Venmo or Zelle username). The group leader can also choose to either make the group open or request-only. Open groups can be joined by anyone at any time up to their capacity, while request-only groups require new members to submit a request to join, which can then be accepted or rejected by that group’s leader. 

When a new user wants to join a new group, they will visit the groups page and see a list of currently available groups displayed. To join a group, they can click on a “join” button. If the user does not want to look through the list of groups and find a specific group, they can just click an “auto-match” button that will insert them into a group that is close to being full but still has space for another member.

After the groups have been finalized (either closed or reached maximum capacity), users will be able to view their group information (teammates, host, plan). The leader of the group will also have a page on which they can view all the members of the group, mark if the member has paid their share of the dues for the payment period, and optionally remove a member from that group if the member has not been paying for the service. Non-leader members will have a page on which they can see the services that they are subscribed to, the amount that they have to pay for each service, and when those amounts are due to their group leader. 

Users will also be able to view the terms and conditions of their payment plan, such as the amount, type (Venmo/Zelle/etc.), and deadline. We will enable hosts to update and track their payments so they can know who has already paid and who is behind on their payment deadlines. This will also be useful for hosts to determine inactive members who should be removed from the family plan.

## UI Mockup

![Sign In.png](./assets/Sign%20In.png)

![Create Group.png](./assets/Create%20Group.png)

![Join Group.png](./assets/Join%20Group.png)

## Work Distribution

For the work distribution, we expect to be collaborating on all pieces of the project. However, each member will take a leading role on several of the features of the project. Rustom and Alec will take the lead on the full-stack development on the project due to their prior experience with the tools, and Ayan and Pascal will take the lead on the database creation and administration side of the project on the backend. We will make sure all members are contributing to the creation of the SQL queries that that will be used to display information on the frontend, as this will be required for almost every component that we create. 

Looking at the specific functionality that we outlined above, we can also address who will take ownership of certain features even though much of that work will be extremely collaborative. Alec will own the user management system with regarding to onboarding new users and enabling exist members to sign into their accounts through user authentication. Ayan will lead the family plan creation/deletion pipeline where the group host outlines the terms and conditions of the family plan. Rustom will own the group selection page and auto-matching feature. Pascal will own the payments section of the platform, as well as the ability for group members to check payment information.