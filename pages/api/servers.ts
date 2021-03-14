import handler from '../../middleware/database';
import { Server } from '../../lib/models/server';
import { sort } from '../../lib/services/filter.service';

export default handler().get(async (req, res) => {
    const servers: Server[] = await req.collection.find().toArray();
    const list = sort(servers, 'n=n');
    res.status(200).json(list);
})