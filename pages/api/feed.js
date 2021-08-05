import prisma from '../../lib/prisma'

export default async function handle(req, res) {
    const name = decodeURIComponent(req.body).split(',')
    const posts = await prisma.game_urls.findMany({
      where : {
        AND: [{
          name : {not: ''}
        },{
          name : {in : name}
        }
      ]
      },
      take:100
    })
    res.json(posts)
}
