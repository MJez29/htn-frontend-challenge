# Hack the North - Front End Challenge

### Michal Jez

## Countdown Clock

Well the countdown clock does what it needs to do... it successfully counts down from 2:00:00 every time the page is refreshed

## Schedule

With the schedule some things work and some things don't...

The events don't overlap and try to arrange themselves optimally (or at least close enough) so that they take up the least horizontal space possible. The filters both do and don't work... they successfully detect when changes occur to the filters and call the right callbacks. The issue seems to be that React is unmounting the wrong components so that it results in some of the wrong events being rendered... which I can't seem to figure out why that's happening. The bookmark buttons are there but sadly aren't functional. It probably wouldn't too hard to fix (just add another field to the event class and add a callback for the button press). The "My Schedule" doesn't work either but if I had the time I'd store the user's bookmarks in their local storage so that their schedule would still be accessible on a page refresh.

## Extras

If I had the time I'd probably also implement a Google Map to also visually display where the events are taking place around campus. A useful performance metric would be to post to the server what events the user bookmarks as that can help give the organizers/sponsors an idea of how many people are interested in certain events.

## Additional Comments

I know it may not have any sexy animations or unparalled css effects but I still put in an effort that I'm satisfied with. After finishing hell week instead of cracking a cold one with the boys, I tried to grind this out as much as possible and I hope you like it.

 ~ Michal