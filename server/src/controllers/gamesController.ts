import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

    public async list(req: Request, res: Response) {
        const game = await pool.query('SELECT * FROM game');
        res.json(game);
    }

    public async getOne(req:Request, res:Response): Promise<any>{
        const { id } = req.params;
         const game = await pool.query('SELECT * FROM game WHERE id = ?', [id]);
         if (game.length > 0 ) {
            return res.json(game[0]);
         }     
         res.json({text: 'The Game Does´t exist'});
         
    }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO game set ?', [req.body]);  
        res.json({message: 'Game saved' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM game WHERE id = ?', [id]);
        res.json({text: 'The Games Was Delete'});
    }

    public async update(req: Request, res: Response): Promise<void>{
     const { id } = req.params;
     await pool.query('UPDATE game set ? WHERE id = ?', [req.body, id]);
     res.json({message: 'The was update'});
    }
}

export const gamesController = new GamesController();
export default gamesController;