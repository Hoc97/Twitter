import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import Follower from '~/models/schemas/Follower.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/User.shema'
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.1ky20w7.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  private users_collection: string = 'users'
  private refreshTokens_collection: string = 'refresh_tokens'
  private followers_collection: string = 'followers'

  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.log('Error', err)
      throw err
    }
  }

  get users(): Collection<User> {
    return this.db.collection(this.users_collection)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(this.refreshTokens_collection)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(this.followers_collection)
  }
}

const databaseService = new DatabaseService()
export default databaseService
