# Notification Innovation Station

An Internet-of-Things experiment by Jemima aged 9 (with some assistance from Dad).

We're making a connected device to let us know about some things we care about.

At the moment - the notifications the Innovation Station will show are : 

- What's the weather going to be like tommorrow? (temperature and conditions)
- How high is the tide right now? (so we know when to head down to the beach!)
- Where's Mum? Is she on the way home?
- Do I have any new emails?

## So far
We're tried out writing some code to make motors and lights change, and designed some ways to show weather symbols on a wheel.


Using freeboard.io we can check that the server is doing the right thing and updating when there are new notifications.



## Bits

### Server
This checks for new emails, weather reports and tide conditions and publishes notifications to the Station. It also recieves notifications from the Tracking App. 

Written in [Node.js](), storing data in [Redis](http://redis.io/), hosted with [Heroku](https://heroku.com/) with notifications delivered by [dweet.io](https://dweet.io/) and [PubNub](http://www.pubnub.com/).

### Station
This is all the hardware (light, motors, sensors etc.) plugged into laptop - it subscribes to notifications when things have changed. Written in Python.

Currently using 'pre-arduino' kit for children called [Hummingbird](http://www.hummingbirdkit.com/). This is awesome and includes lots of fun sensors and controllers - but needs to be plugged into a computer to work. We'll be swap for an Arudino kit later on.

### Tracking App
Tells the Server the current location of Mum's phone. Written in HTML and JavaScript using [PhoneGap](http://phonegap.com/)

We might also make a website client and an app client.


## Design

The materials are likely to be laser cut wood (we like the berg [Twitter Clock](http://bergcloud.com/case-studies/flock)) with translucent panels and lights.

We're using [Lucid Chart](https://www.lucidchart.com/) to try out different designs. When it comes to making a more detailed drawing for Laser Cutting and working out how to fit all the bits in the box - we'll probably switch to [SketchUp](http://www.sketchup.com/)












