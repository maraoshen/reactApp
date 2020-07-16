const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Employee = require('./Employee');

module.exports = {
  name: 'api',
  async register(server, options) {
    server.route({
      method: 'POST',
      path: '/employees',
      handler: async (request, h) => {
        try {
          const payload = request.payload;
          const exists = Employee.find({$email: payload.email});
          return exists.then(
            result => {return result},
            error => {return error}
          ).then(
            result => {
              if (typeof result !== 'undefined' && result) return Boom.badRequest('Email Exists');
              const saved = Employee.save({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                phone: payload.phone,
                role: payload.role
              });
              return saved;
            },
            error => {return Boom.badImplementation(error)}
          );
        } catch (e) {
          console.error(e);
          return Boom.badImplementation(e);
        }
      },
      options: {
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            role: Joi.string().required()
          })
        }
      }
    })
    server.route({
      method: 'GET',
      path: '/employees',
      handler: (request, h) => {
        try {
          const employees = Employee.findAll({
            $role: request.query.role
          });
          return employees.then(
            result => {return result},
            error => {return error;}
          ).then(
            result => {
              if (typeof result === 'undefined') return Boom.badRequest('Does not Exist');
              return result
            },
            error => {return Boom.badImplementation(error);}
          );
        } catch (e) {
          console.error(e);
          return Boom.badImplementation(e);
        }
      },
      options: {
        tags: ['api'],
        validate: {
          query: Joi.object().keys({
            role: Joi.string()
          })
        }
      }
    })
    server.route({
      method: 'GET',
      path: '/employees/{id}',
      handler: (request, h) => {
        try {
          const employee = Employee.find({$id: request.params.id});
          return employee.then(
            result => {return result},
          ).then(
            result => {
              if (typeof result === 'undefined') return Boom.badRequest('Does not Exist');
              return result
            },
            error => {return Boom.badImplementation(error);}
          )
        } catch (e) {
          console.error(e);
          return Boom.badImplementation(e);
        }
      },
      options: {
        tags: ['api'],
        validate: {
          params: Joi.object().keys({
            id: Joi.number()
          })
        }
      }
    })
  }
}