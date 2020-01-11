=====
Intro
=====

I made this after `Mozilla Gateway <https://iot.mozilla.org/gateway/>`_ stopped working for me, so it has some similarities with that, but not really.

How it works
============

This program does all its communication with things through an MQTT broker.
It listens to the ``iot/hello`` topic where things can announce themselves with their name, props, etc. and initiate further communication.
This happens through two topics per thing, ``iot/[uid]/send`` and ``iot/[uid]/recv``.

The program then stores data like the state of different props and user data on a mongodb server and provides a REST API and progressive web app as a user interface