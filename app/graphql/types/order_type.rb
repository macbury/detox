module Types
  class OrderType < Types::BaseEnum
    graphql_name 'Order'

    value 'Newest'
    value 'UnreadFirst'
    value 'Oldest'
    value 'RecentlyRead'
  end
end
