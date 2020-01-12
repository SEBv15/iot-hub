========
REST API
========

This token based api is used by the webapp as the backend.

All subsequent endpoints exist at ``/api/v1/[endpoint]`` and are all POST requests with ``x-www-form-urlencoded`` content type.

A token is needed for everything but ``auth/login`` and should be supplied as POST body ``token`` parameter.

Authentication
==============

POST ``auth/login``
-------------------
This takes ``username`` and ``password`` and will return

+-------+---------------------+----------------------+
| Name  | Type                | Description          |
+=======+=====================+======================+
| error | ``null``/``string`` | Description of error |
+-------+---------------------+----------------------+
| token | ``string``          | the auth token       |
+-------+---------------------+----------------------+

POST ``auth``
-------------
takes a ``token`` parameter and returns all info about the current user.

+-------+---------------------+----------------------+
| Name  | Type                | Description          |
+=======+=====================+======================+
| error | ``null``/``string`` | Description of error |
+-------+---------------------+----------------------+
| user  | ``object``          | The user data:       |
|       |                     | | ``username``       |
|       |                     | | ``things``         |
|       |                     | | ``admin``          |
|       |                     | | ``createdBy``      |
+-------+---------------------+----------------------+
