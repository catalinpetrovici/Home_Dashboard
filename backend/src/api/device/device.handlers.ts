import { Request, Response } from 'express';

async function getAll(req: Request, res: Response): Promise<void> {
  // TODO VALIDATE THE BODY

  // TODO ERROR HANDLING

  res.json();
}

async function add(req: Request, res: Response): Promise<void> {
  // TODO VALIDATE THE BODY

  // TODO ERROR HANDLING

  res.json();
}

async function remove(req: Request, res: Response): Promise<void> {
  // TODO VALIDATE THE BODY

  // TODO ERROR HANDLING

  res.json();
}

async function update(req: Request, res: Response): Promise<void> {
  // TODO VALIDATE THE BODY

  // TODO ERROR HANDLING

  res.json();
}

export default { getAll, update, add, remove };
