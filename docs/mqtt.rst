====
MQTT
====

Communcation with things happens over MQTT. 

Topics
======

``iot/hello``
    All things need to annouce themselves and give information about themselves in JSON:

    .. code-block:: javascript

        {
            uid: "example-lamp", // The unique ID for the thing (only use url friendly characters)
            props: { onOff: "boolean", rangeExample: "0-100" }, // An object with the prop name as key and accepted input as value (boolean/string/number/[min]-[max]),
            name: "Example Lamp", // The name of the thing (default: "Unnamed")
            mainProp: "onOff", // If you have a boolean prop that should be clickable from the dashboard (default: "")
            icon: "lamp" // What icon the thing should have (default: "")
        }

``iot/[uid]/config``
    Whenever a thing publishes to ``iot/hello``, we respond with the current states of the different props on this topic



``iot/[uid]/recv``
    Where things receive data

``iot/[uid]/send``
    Where things send data
