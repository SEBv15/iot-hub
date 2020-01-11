# iot-hub

I didn't like mozilla gateway so I made my own
 
## Setup
Create `.env` file in the `/server` directory with the following value

| Name | Value |
| --- | --- |
| `MQTT_USERNAME` | Username for the MQTT server |
| `MQTT_PASSWORD` | Password for the MQTT server |
| `SECRET` | The secret used to generate tokens (16-bit hex value) |
| `ENV` | production: serve `server/build` folder, development: proxy port 3000 |

## Building

### React Production Build
`npm run build` inside webapp

copy `webapp/build` to `server/build`

### Dockerizing

IMPORTANT: just using latest as a tag will result in the new image not being pulled. Just use a version number and update containers manually.

```cmd
cd server
docker build --no-cache -t 192.168.1.101:5000/iot-hub:[version] .
docker push 192.168.1.101:5000/iot-hub
```
