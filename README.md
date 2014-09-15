# Notification Innovation Station

An Internet-of-Things experiment by Jemima aged 9 (with some assistance from Dad).

We're making a connected device to let us know about some things we care about.

We'll answer these questions : 

- What's the weather going to be like tomorrow? (temperature and conditions)
- How high is the tide right now? (so we know when to head down to the beach!)
- Where's Mum? Is she on the way home?
- Do I have any new emails?

## So far
We've written some code to make motors and lights change, and designed some ways to show weather symbols on a wheel.

<a href="http://ymkm.com/i/nis.png" target="_blank" ><img src="http://ymkm.com/i/nis.png" width=500></a>

The notification and tracking bits are working. The next steps are to work out the best way to show show all the information with lights and motors, and then how to squeeze all this bits into a box. I think we may need a glue gun!

Using [freeboard.io](http://freeboard.io/) we can easily check that the server is doing the right thing and updating when there are new notifications.

<a href="http://ymkm.com/i/freeboard.png" target="_blank" ><img src="http://ymkm.com/i/freeboard.png" width=500></a>

## Bits

### Server
This checks for new emails, weather reports and tide conditions and publishes notifications to the Station. It also receives notifications from the Tracking App. 

Written in [Node.js](), storing data in [Redis](http://redis.io/), hosted with [Heroku](https://heroku.com/) with notifications delivered by [dweet.io](https://dweet.io/) and [PubNub](http://www.pubnub.com/).

### Station
This is the hardware (box, light, motors, sensors etc.) plugged into laptop. It subscribes to notifications when things have changed. Written in Python.

We're currently using a 'pre-arduino' kit for children called [Hummingbird](http://www.hummingbirdkit.com/). This is awesome and includes lots of fun sensors and controllers - but as it needs to be plugged into a computer to work we'll swap for an Arduino kit later on.

### Tracking App
This tells the Server the current location of Mum's phone. Written in HTML and JavaScript using [PhoneGap](http://phonegap.com/)

We might also make a website client and an app client.

## Design

The materials are likely to be laser cut wood (we like the berg [Twitter Clock](http://bergcloud.com/case-studies/flock)) with translucent panels and lights.

We're using [Lucid Chart](https://www.lucidchart.com/) to try out different designs. When it is time for a more detailed drawing for Laser Cutting and working out how to fit all the bits in the box - we'll switch to [SketchUp](http://www.sketchup.com/)












