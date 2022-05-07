import dynamic from 'next/dynamic'

const SalesNoSSR = dynamic(
    () => import('../../components/admin/SalesMain'), {
    ssr: false
})

export default () => <SalesNoSSR />