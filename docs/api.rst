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
Login or rather acquire an auth token.

Parameters
    +-----------+------------------------------------------+
    | Name      | Description                              |
    +===========+==========================================+
    | username  | Your username                            |
    +-----------+------------------------------------------+
    | password  | Your password                            |
    +-----------+------------------------------------------+

Response
    +-------+---------------------+----------------------+
    | Name  | Data                | Description          |
    +=======+=====================+======================+
    | error | ``null``/``string`` | Description of error |
    +-------+---------------------+----------------------+
    | token | ``string``          | the auth token       |
    +-------+---------------------+----------------------+

.. _auth:

POST ``auth``
-------------
Get info about the current user.

Parameters
    +-----------+------------------------------------------+
    | Name      | Description                              |
    +===========+==========================================+
    | token     | The auth token                           |
    +-----------+------------------------------------------+

Response
    +-------+-----------------------------+----------------------+
    | Name  | Data                        | Description          |
    +=======+=============================+======================+
    | error | ``null``/``string``         | Description of error |
    +-------+-----------+-----------------+----------------------+
    | user  | ``object``| | ``admin``     | The user data as     |
    |       |           | | ``username``  | JSON object.         |
    |       |           | | ``things``    |                      |
    |       |           | | ``createdBy`` |                      |
    +-------+-----------+-----------------+----------------------+

POST ``auth/changePassword``
----------------------------
Change your account's password.

Parameters
    +-----------+------------------------------------------+
    | Name      | Description                              |
    +===========+==========================================+
    | token     | The auth token                           |
    +-----------+------------------------------------------+
    | password  | The new password                         |
    +-----------+------------------------------------------+
    | username  | Username of the account (admin only)     |
    +-----------+------------------------------------------+

Response
    +-------+---------------------+----------------------+
    | Name  | Data                | Description          |
    +=======+=====================+======================+
    | error | ``null``/``string`` | Description of error |
    +-------+---------------------+----------------------+

POST ``auth/listUsers`` *(admin only)*
--------------------------------------
List all existing users.

Parameters
    +-----------+------------------------------------------+
    | Name      | Description                              |
    +===========+==========================================+
    | token     | Your admin auth token                    |
    +-----------+------------------------------------------+

Response
    +-------+---------------------+----------------------+
    | Name  | Data                | Description          |
    +=======+=====================+======================+
    | error | ``null``/``string`` | Description of error |
    +-------+---------------------+----------------------+
    | users | ``object array``    | Users (same fields   |
    |       |                     | as auth_)            |
    +-------+---------------------+----------------------+

POST ``auth/addUser`` *(admin only)*
----------------------------------
Add a user to the database.

Parameters
    +-----------+------------------------------------------+
    | Name      | Description                              |
    +===========+==========================================+
    | token     | Your admin auth token                    |
    +-----------+------------------------------------------+
    | password  | The new password                         |
    +-----------+------------------------------------------+
    | username  | Username of the account                  |
    +-----------+------------------------------------------+

Response
    +-------+---------------------+----------------------+
    | Name  | Data                | Description          |
    +=======+=====================+======================+
    | error | ``null``/``string`` | Description of error |
    +-------+---------------------+----------------------+

POST ``auth/deleteUser`` *(admin only)*
-------------------------------------
Delete a user from the database.

Parameters
    +-----------+------------------------------------------+
    | Name      | Description                              |
    +===========+==========================================+
    | token     | Your admin auth token                    |
    +-----------+------------------------------------------+
    | username  | Username of the account                  |
    +-----------+------------------------------------------+
Response
    +-------+---------------------+----------------------+
    | Name  | Data                | Description          |
    +=======+=====================+======================+
    | error | ``null``/``string`` | Description of error |
    +-------+---------------------+----------------------+
