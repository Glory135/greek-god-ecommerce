interface Props {
  params: Promise<{
    collection: string
  }>
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params

  return (
    <div className="">
      Collection: {collection}
    </div>
  )
}