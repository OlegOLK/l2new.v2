import handler from '../../middleware/database';
import { Server } from '../../lib/models/server';
import { sort } from '../../lib/services/filter.service';
import { parseQuery } from '../../lib/services/url.parser';
export default handler().get(async (req, res) => {
    const servers: Server[] = await req.collection.find().toArray();
    const query = parseQuery(req.query);
    // console.log('pcz', query)
    const list = sort(servers, query);
    res.status(200).json(list);
})