FactoryBot.define do
  factory :pubsub_subscription do
    channel { "" }
    secret { "MyString" }
  end
end
