const { MongoClient } = require('mongodb');

class MongoDAO {
  constructor() {
      this.client = new MongoClient('mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase28?retryWrites=true&w=majority', { useUnifiedTopology: true });
      this.dbName = 'testDB';
      this.collectionName = 'users';
  }

  async connect() {
      if (!this.client.isConnected()) {
          await this.client.connect();
      }
  }

  async create(user) {
      await this.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      const result = await collection.insertOne(user);
      return result.ops[0];
  }

  async getAll() {
      await this.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      return collection.find({}).toArray();
  }
  async get(id) {
      await this.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      return collection.findOne({ _id: id });
  }

  async update(id, userData) {
      await this.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      const result = await collection.updateOne({ _id: id }, { $set: userData });

      if (result.matchedCount === 0) return null;
      return this.get(id);
  }

  async delete(id) {
      await this.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      await collection.deleteOne({ _id: id });
  }
}

module.exports = MongoDAO