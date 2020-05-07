import 'reflect-metadata'
import { createConnection } from 'typeorm'
import app from './app'

createConnection()
  .then(async () => {
    console.log('Connected to database...') // eslint-disable-line no-console
    app.listen(process.env.PORT || 3000, () => {
      console.log(`listening on port ${process.env.PORT || 3000}`) // eslint-disable-line no-console
    })

    /* const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await connection.manager.save(user)
    console.log(`Saved a new user with id: ${user.id}`)

    console.log('Loading users from the database...')
    const users = await connection.manager.find(User)
    console.log('Loaded users: ', users)

    console.log('Here you can setup and run express/koa/any other framework.') */
  })
  .catch((error) => console.log(error))
