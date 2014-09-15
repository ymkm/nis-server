# Notification Innovation Station

An Internet-of-Things experiment by Jemima (aged 9) with some assistance from Dad.

We're making a connected device to let us know about some things we care about.

The materials are likely to be laser cut wood (we like the berg [Twitter Clock](http://bergcloud.com/case-studies/flock)) with translucent panels and lights.

At the moment - the notifications the Innovation Station will show are : 

- What's the weather going to be like tommorrow? (temperature and conditions)
- How high is the tide right now? (so we know when to head down to the beach!)
- Where's Mum? Is she on the way home?
- Do I have any new emails?

## Software

The three bits we need to write code for are

- the **Server**, which coordinates everything (this repository) and publishes notifications
- the **Station** (which checks for new information and tells the motors and lights when to change
- the **Tracking App** - which lets us know where Mum is.

We might also make a website client and an app client.

### Server
Checks for new emails, weather reports and tide conditions. Recieves notifications from the Tracking App. 

Written in [Node.js](), storing data in [Redis](http://redis.io/), hosted with [Heroku](https://heroku.com/) with notifications delivered by [dweet.io](https://dweet.io/) and [PubNub](http://www.pubnub.com/).

### Station
Subscribes to notifications when things have changed. Written in Python.

### Tracking App
Tells the Server the current location of Mum's phone. Written in HTML and JavaScript using [PhoneGap](http://phonegap.com/)

# Hardware

Currently using 'pre-arduino' kit for children called [Hummingbird](http://www.hummingbirdkit.com/). This is awesome and includes lots of fun sensors and controllers - but needs to be plugged into a computer to work. We'll be swapping for an Arudino kit after the first version is built.

# Design
We're using [Lucid Chart](https://www.lucidchart.com/) to try out different designs. When it comes to making a more detailed drawing for Laser Cutting and working out how to fit all the bits in the box - we'll probably switch to [SketchUp](http://www.sketchup.com/)












