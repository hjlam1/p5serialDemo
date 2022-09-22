# Pong - P5.Serial with P5.Play and Arduino Demo
Pong in P5.js with Arduino Two Potentiometer Controller

TwoPotB is a very simple Arduino sketch which reads analog on AO and A1 of the Arduino. Serial is 9600 baud rate. Serial output is formatted as 0-1023 for the two analogReads which are separated by a ',' (comma).

Pong in P5 picks up the serial output and applies the 0-1023 value as the height for each paddle.

Serial communication uses P5.serial. Tested with node.js http-server and P5.serialcontrol (https://github.com/p5-serial/p5.serialcontrol/releases)
P5.Play (https://github.com/molleindustria/p5.play) is used for collision and physics
