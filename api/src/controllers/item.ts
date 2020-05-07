import { getRepository, DeleteResult } from 'typeorm'
import User from '../data/models/User'
import Item from '../data/models/Item'

class ItemController {
  static async findAll(userId: string): Promise<Item[]> {
    return getRepository(Item).find({
      user: {
        id: parseInt(userId, 10),
      },
    })
  }

  static async create(item: Partial<Item>, userId: string): Promise<Item> {
    const newItem = item
    const user = await getRepository(User).findOne({
      id: parseInt(userId, 10),
    })

    newItem.user = user

    return getRepository(Item).save(newItem)
  }

  static async update(item: Partial<Item>): Promise<Item> {
    const itemRepository = getRepository(Item)

    const current = await itemRepository.findOne({
      id: item.id,
    })

    const newItem = itemRepository.merge(current, item)

    return itemRepository.save(newItem)
  }

  static async delete(id: string): Promise<DeleteResult> {
    const itemRepository = getRepository(Item)

    const item = await itemRepository.findOne({
      id: parseInt(id, 10),
    })

    return itemRepository.delete(item)
  }
}

export default ItemController
