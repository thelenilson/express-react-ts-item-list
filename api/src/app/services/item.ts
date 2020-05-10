import express, { Router, Response, Request } from 'express'
import ItemController from '../../controllers/item'
import handleError from '../errors/handler'

class ItemService {
  static setupRouter(): Router {
    const router = express.Router()

    router.get('/', this.findAll)
    router.post('/', this.create)
    router.put('/:id', this.update)
    router.delete('/_bulk', this.bulkDelete)
    router.delete('/:id', this.delete)

    return router
  }

  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const result = await ItemController.findAll(req.userId)
      const data = result.map((item) => ({
        type: 'item',
        ...item,
      }))
      return res.status(200).json({ data })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body
      const item = await ItemController.create(
        {
          name,
        },
        req.userId
      )
      const data = {
        type: 'item',
        ...item,
      }
      return res.status(200).json({ data })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { name } = req.body
      const item = await ItemController.update({
        id: parseInt(id, 10),
        name,
      })
      const data = {
        type: 'item',
        ...item,
      }
      return res.status(200).json({ data })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const item = await ItemController.delete(id)
      const data = {
        type: 'item',
        ...item,
      }
      return res.status(200).json({ data })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async bulkDelete(req: Request, res: Response): Promise<Response> {
    try {
      const { ids } = req.body
      const item = await ItemController.bulkDelete(ids)
      const data = {
        type: 'item',
        ...item,
      }
      return res.status(200).json({ data })
    } catch (error) {
      return handleError(res, error)
    }
  }
}

export default ItemService
