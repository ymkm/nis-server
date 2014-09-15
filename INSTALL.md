# Running your own Notification Innovation Station

Following the conventions for [node-config](https://github.com/lorenwest/node-config), copy [default.json](https://github.com/ymkm/nis-server/blob/master/config/default.json) to create your own **local.json** or **production.json** and fill in the empty strings: 

- emailUsername : a gmail username
- emailPassword : a gmail password
- pubnub.publishKey & subscribeKey : sign up for a free account at [PubNub](http://www.pubnub.com/) to get these
- key.email , weather, tides, location : unqiue keys (I used GUIDs) for PubNub and [dweet.io](http://dweet.io/)
