import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './User'

@Entity()
class Item {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne((type) => User, (user) => user.items)
  user: User
}

export default Item
