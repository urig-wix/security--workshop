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

## Issue number 1

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

