import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.gameinfo.findMany({
    where: {title: {in: JSON.parse(req.body)}},
  })
  res.json(posts)
}
