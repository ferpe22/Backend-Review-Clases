
class MemoryDAO {
    constructor() {
        this.users = [];
        this.currentId = 1;
    }

    async create(user) {
        user.id = this.currentId++;
        this.users.push(user);
        return user;
    }

    async getAll() {
        return this.users;
    }

    async get(id) {
        return this.users.find(user => user.id === parseInt(id));
    }

    async update(id, userData) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if(index === -1) return null;

        this.users[index] = { ...this.users[index], ...userData };
        return this.users[index];
    }

    async delete(id) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if(index === -1) return;

        this.users.splice(index, 1);
    }
}

module.exports = MemoryDAO