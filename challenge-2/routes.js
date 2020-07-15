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
          const exists = await Employee.find({$email: payload.email});
          if (exists) return Boom.badRequest('Email Exists');
          const saved = await Employee.Save({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone,
            role: payload.role
          });
          return saved;
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
          return employees.map(employee => employee);
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
          const employee = await Employee.find({$id: request.params.id});
          return employee
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

    // TODO:
    // /employees/{id}
    // Employee.find

  }
}