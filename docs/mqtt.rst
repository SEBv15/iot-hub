====
MQTT
====

Communcation with things happens over MQTT. 

Topics
======

``iot/hello``
    All things need to annouce themselves and give information about themselves:

    +----------+-----------------------------+
    | ``uid``  | The unique ID for the thing |
    +----------+-----------------------------+
    | ``name`` | The name of the thing       |
    +----------+-----------------------------+