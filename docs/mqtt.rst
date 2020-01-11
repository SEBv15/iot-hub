====
MQTT
====

Communcation with things happens over MQTT. 

Topics
======

``iot/hello``
    All things need to annouce themselves and give information about themselves:

    .. code-block:: javascript

        {
            uid: "example-lamp", // The unique ID for the thing (only use url friendly characters)
            props: { bool: "boolean", rangeExample: "0-100" }, // An object with the prop name as key and accepted input as value (``boolean``/``string``/``number``/``[min]-[max]``),
            name: "Example Lamp" // The name of the thing 
        }
