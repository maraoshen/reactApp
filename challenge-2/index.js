
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const pkg = require('./package.json');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        routes: {
          cors: {
              origin: ['*'],
          }
        }
    });

    const swaggerOptions = {
      info: {
          title: 'Finegrove Medical Employee E-Passes Documentation',
          version: pkg.version,
      }
    };
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    await server.register({
      plugin: routes
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();