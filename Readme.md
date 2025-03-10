# Order Processing System ⚙️


## Overview 🫣

This project is a scalable, event-driven order processing system built with Node.js, Express, MongoDB, Redis, and AWS (SQS & SES). It supports JWT-based authentication, order management with inventory validation, asynchronous processing, caching, and email notifications.

  
## Setup Instructions 📝
  
1. Clone [this](https://github.com/AnupNarvekar/XhipmentAssignment) repo locally and open the root project dir in a terminal
2. Get [this](https://drive.google.com/drive/folders/1hBC7_fw7n7XK8aT7_qif6sX-Z_9PafLh?usp=drive_link) `.env` file and paste it in the root dir.
3. Execute command `npm i` from the root dir in a terminal
4. Start the node.js server by executing command `node src/server.js` from the root dir in terminal
5. Start the orderProcessor worker by executing command `node src/workers/orderProcessor.js` from the root dir in a **NEW** terminal
6. Get [this](https://www.postman.com/aviation-pilot-4183524/xhipment-assignment/overview) postman collection for testing the APIs

# Important‼️⚠️
My SES account is currently in sandbox mode, which only allows sending emails to verified email addresses. Therefore, any email sent to an address that hasn't been verified in the AWS Console will be rejected by SES. To bypass this limitation, production access is required, which in turn requires domain verification; and since I do not own a domain, I cannot obtain production access at this time. Please provide your email address, during testing this and I will verify it temporarily at my end.

And secondly, avoid load testing the APIs as the AWS account being used is connected to my personal card and the APIs aren't being rate limited. 🥲
