FactoryBot.define do
  factory :group do
    sequence(:name) { |index| "Group#{index}" }
    association(:user)
    icon { "bank" }
  end
end
