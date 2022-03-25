import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const query = JSON.parse(req.body)
  let ps = []
  const regx = /[！？｡＂＃＄％＆＇（）＊＋－／：；＜＝＞＠［＼］＾＿｀｛｜｝～｟｠｢｣､、〃》「」『』【】〔〕〖〗〘〙〚〛〜〝〞〟〰〾〿–—‘'‛“”„‟…‧﹏®™\!\"#$%&\'()+,-.\/:;<=>\?@\[\\\]^_`\{\|\}~\s]+/g
  query.map(async (item:string) => {
    ps.push(item.replace(regx, '').toLowerCase())
  })
  
  const posts = await prisma.gameinfo.findMany({
    where: {match: {
      in: ps,
      mode: 'insensitive'
    }},
  })
  res.json(posts)
}
