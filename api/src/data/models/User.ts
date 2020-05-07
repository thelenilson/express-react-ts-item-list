import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm'
import Item from './Item'

@Entity()
@Unique(['email'])
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany((type) => Item, (item) => item.user)
  items: Item[]
}

export default User
