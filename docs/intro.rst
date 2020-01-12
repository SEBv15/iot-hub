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

Deploying
=========

Configuration
-------------

The MQTT and MongoDB server urls are currently hardcoded and probably won't work in any new environment.

Some configuration can be made by adding a ``.env`` file to the ``server/`` folder:

+---------------+----------------------------------------------------------------+
| MQTT_USERNAME | The username for the MQTT broker                               |
+---------------+----------------------------------------------------------------+
| MQTT_PASSWORD | The password for the MQTT broker                               |
+---------------+----------------------------------------------------------------+
| SECRET        | The secret used to encrypt the tokens (32-bit hex recommended) |
+---------------+----------------------------------------------------------------+
| ENV           | ``development`` or ``production``                              |
+---------------+----------------------------------------------------------------+

Building WebApp
---------------

To build the react app, run ``npm run build`` inside the ``/webapp`` folder and then copy the ``build`` folder to ``/server``.

Dockerizing
-----------

.. code-block:: bash

    cd server
    docker build --no-cache -t 192.168.1.101:5000/iot-hub:[version] .
    docker push 192.168.1.101:5000/iot-hub

