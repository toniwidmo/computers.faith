# This is the code for my personal user page on Computers Faith.

You can view the actual page on [https://computers.faith/~kz69/](https://computers.faith/~kz69/).

There is also a mirror of the site on github pages: [https://toniwidmo.github.io/computers.faith/](https://toniwidmo.github.io/computers.faith/).

# BlockPress.Me
It is based on an old project of mine called BlockPress.Me, but I am developing a couple of
modules not available in the main BlockPress.Me repo, and which I will never release there.
They should be compatible with any BlockPress.Me based website, although they are pretty
fringe weirdness. These modules are:

## EnigMagick Client Module
This is a module to interface with the API of another project of mine called EnigMagick.
It takes a number, or uses gematria to evaluate a number from a word or phrase, then
looks through a text file for other words or phrases that add up to the same number, then
displays those matches in a list.

For it to work you need an installation of EnigMagick running on a web server that
supports PHP, and you need to turn on the API. By default this module uses the EnigMagick
API provider on computers.faith, which is currently an open API(*), but if you can run your own
server you can customise the available texts.

This module is a work in progress. So far it has permlinks for each search run and
has a working list of results when running searches. Still to do is displaying the
value triangle, and having the matches clickable to display their own value triangles.

(*) We can't guarantee the computers.faith server will remain open, so it is still
best to get your own server if you can.

## ChaosHex3
This is a Cyber Magic tool for 'hacking reality'. ChaosHex 1.0 was an MSDOS program
I wrote in the late 1990s, which has now been lost. I then wrote ChaosHex 2.0 as a BASH script 
which can be downloaded and installed on most Linux and other OSes that support a BASH shell.
This is a stub for a third version, which will be web based. The BASH version may also in
time receive updates, but this version is my new priority.

# References
* https://github.com/blockpress/blockpress.me
* https://github.com/toniwidmo/enigmagick
* https://sourceforge.net/projects/chaoshex/
