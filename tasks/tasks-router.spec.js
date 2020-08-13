// const db = require('../data/dbConfig.js');

const server = require('../api/server.js');

const request = require('supertest');

// mock the authentication middleware so we can test what's actually in the endpoint
const authenticate = require('../auth/authenticate-middleware');
jest.mock('../auth/authenticate-middleware');

const TasksModel = require('./tasks-model');
jest.mock('./tasks-model');

const TaskNamesModel = require('./task-names-model');
jest.mock('./task-names-model');

const CategoriesModel = require('./categories-model');
jest.mock('./categories-model');

describe('tasksRouter tests', () => {
  // events end point test one event
  describe('GET', () => {
    describe('get task by id and user_id', () => {
      it('returns a 200 status for successful request', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        TasksModel.findById = jest.fn(() => [{ user_id: 1, id: 1 }]);

        const res = await request(server).get('/api/tasks/findById/user=1/1');

        expect(res.status).toBe(200);
      });

      it('JSON response', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        TasksModel.findById = jest.fn(() => [{ user_id: 1, id: 1 }]);

        const res = await request(server).get('/api/tasks/findById/user=1/1');

        expect(res.type).toMatch('application/json');
      });
    });

    describe('get all tasks by user_id', () => {
      it('returns a 200 status for successful request', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        TasksModel.findByUserId = jest.fn(() => [
          { user_id: 1, task_id: 1 },
          { user_id: 1, task_id: 2 },
        ]);

        const res = await request(server).get('/api/tasks/findByUserId/1');

        expect(res.status).toBe(200);
      });

      it('JSON response', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        TasksModel.findByUserId = jest.fn(() => [
          { user_id: 1, task_id: 1 },
          { user_id: 1, task_id: 2 },
        ]);

        const res = await request(server).get('/api/tasks/findByUserId/1');

        expect(res.type).toMatch('application/json');
      });
    });
  });

  // test add task
  describe('POST', () => {
    describe('create new task', () => {
      it('return a 201 status for successful task creation', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        // returns the id of the newly created Task
        TasksModel.add = jest.fn(() => 1);
        TaskNamesModel.findBy = jest.fn(() => [{ id: 1 }]);
        CategoriesModel.findBy = jest.fn(() => [{ id: 1 }]);

        const res = await request(server).post('/api/tasks/createTask').send({
          user_id: 1,
          task_name: 'Wash car',
          category_name: 'Home',
          due_date: '2020-05-11T08:10:25.000Z',
        });

        expect(res.status).toBe(201);
      });

      it('JSON response', async () => {
        authenticate.mockImplementation((req, res, next) => next());
        // returns the id of the newly created Task
        TasksModel.add = jest.fn(() => 1);
        TaskNamesModel.findBy = jest.fn(() => [{ id: 1 }]);
        CategoriesModel.findBy = jest.fn(() => [{ id: 1 }]);

        const res = await request(server).post('/api/tasks/createTask').send({
          user_id: 1,
          task_name: 'Wash car',
          category_name: 'Home',
          due_date: '2020-05-11T08:10:25.000Z',
        });

        expect(res.type).toMatch('application/json');
      });
    });
  });

  // test update task
  describe('PUT', () => {
    describe('update task', () => {
      it('return a 200 status for successful update', async () => {
        authenticate.mockImplementation((req, res, next) => next());
        TasksModel.findById = jest.fn(() => [
          {
            user_id: 1,
            id: 1,
            category_name: 'School',
            task_name: 'a third test',
            task_notes: 'notey notes',
            due_date: '2020-08-22',
            all_day: false,
            is_complete: false,
          },
        ]);

        TasksModel.update = jest.fn(() => ({
          user_id: 1,
          id: 1,
          category_name: 'School',
          task_name: 'a third test',
          task_notes: 'notey notes',
          due_date: '2020-08-22',
          all_day: false,
          is_complete: false,
        }));

        const res = await request(server)
          .put('/api/tasks/updateTask/user=1/1')
          .send({
            task_notes: 'i am an updated task',
          });

        expect(res.status).toBe(200);
      });

      it('JSON response', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        TasksModel.findById = jest.fn(() => [
          { user_id: 1, id: 1, task_notes: 'i am a task' },
        ]);

        TasksModel.update = jest.fn(() => ({
          user_id: 1,
          id: 1,
          task_notes: 'i am an updated task',
        }));

        const res = await request(server)
          .put('/api/tasks/updateTask/user=1/1')
          .send({
            task_notes: 'i am an updated task',
          });

        expect(res.type).toMatch('application/json');
      });
    });
  });

  //   test delete task
  describe('DELETE', () => {
    describe('delete task', () => {
      it('return a 200 status for successful deletion', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        TasksModel.findById = jest.fn(() => [{ user_id: 1, id: 1 }]);

        // returns number of rows deleted
        TasksModel.remove = jest.fn(() => 1);

        const res = await request(server).delete(
          '/api/tasks/deleteTask/user=1/1'
        );

        expect(res.status).toBe(200);
      });

      it('JSON response', async () => {
        authenticate.mockImplementation((req, res, next) => next());

        TasksModel.findById = jest.fn(() => [{ user_id: 1, id: 1 }]);

        // returns number of rows deleted
        TasksModel.remove = jest.fn(() => 1);

        const res = await request(server).delete(
          '/api/tasks/deleteTask/user=1/1'
        );

        expect(res.type).toMatch('application/json');
      });
    });
  });
});
