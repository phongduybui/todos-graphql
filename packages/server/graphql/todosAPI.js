const { RESTDataSource } = require('apollo-datasource-rest');

class TodosAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/api/v1';
  }

  // Intercept request
  willSendRequest(request) {
    if (this.context?.token) {
      request.headers.set('Authorization', this.context.token);
    }
  }

  async register(userData) {
    const results = await this.post('/users', userData);
    return results?.data;
  }

  async login(userData) {
    const results = await this.post('/users/login', userData);
    return results?.data;
  }

  async getMe() {
    const data = await this.get('/users/me');
    return data?.user;
  }

  async getTask(id) {
    const data = await this.get(`/tasks/${id}`);
    return data?.task;
  }

  async getTasks(args) {
    const results = await this.get(`/tasks`, {
      ...args,
      order_by: args.order_by
        ? encodeURIComponent(JSON.stringify(args.order_by))
        : '',
    });
    return results.data;
  }

  async createTask(data) {
    const results = await this.post('/tasks', data);
    return results.task;
  }

  async updateTask({ id, task }) {
    const results = await this.put(`/tasks/${id}`, task);
    return results.updatedTask;
  }

  async deleteTask(id) {
    const results = await this.delete(`/tasks/${id}`);
    return results.task;
  }
}

module.exports = TodosAPI;
