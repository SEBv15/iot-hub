====
MQTT
====

Communcation with things happens over MQTT. 

Topics
======

``iot/hello``
    All things need to annouce themselves and give information about themselves:

    :``uid`` The unique ID for the thing 

    :``props`` An object with the prop name as key and accepted input as value (``boolean``/``string``/``number``/``[min]-[max]``)

    :``name`` The name of the thing 
