FactoryBot.define do
  factory :user do
    sequence(:username) { |index| "#{Faker::Name.unique.name}-#{index}" }
    password { 'admin1234' }
    status { 'normal' }

    trait :with_session do
      after(:create) do |user|
        session = user.sessions.build(attributes_for(:session))
        session.id = '28bf131f-655d-46f4-a731-35e9293919e1'
        session.save!
      end
    end

    trait :as_admin do
      status { 'admin' }
    end
  end
end
