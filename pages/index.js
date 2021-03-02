import { ServerGroup } from '../components/server.group'
import { Layout } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-8">
        <div className="col-span-1">
          <ServerGroup isVip={true} count={2} />
          <ServerGroup count={4} />
        </div>
        <div className="col-span-1">
          <ServerGroup isVip={true} />
          <ServerGroup count={15} />
          <ServerGroup />
          <ServerGroup />
        </div>
      </div>
    </Layout>
  )
}
