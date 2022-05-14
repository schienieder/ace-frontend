import dynamic from 'next/dynamic'

const ForecastNoSSR = dynamic(
    () => import('../../components/admin/ForecastMain'), {
    ssr: false
})

export default () => <ForecastNoSSR />