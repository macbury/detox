FactoryBot.define do
  factory :channel do
    name { 'Example channel' }
    sequence(:source) { |index| "http://webpage#{index}.local" }
    sequence(:site_url) { |index| "http://webpage#{index}.local" }
    kind { 'rss' }
    status { 'pending' }

    trait :with_user do
      association(:user)
    end

    trait :with_one_unread_story do
      after(:create) do |channel, _evaluator|
        create(:article_story, channel: channel, is_read: false)
      end
    end

    trait :with_one_read_story do
      after(:create) do |channel, _evaluator|
        create(:article_story, channel: channel, is_read: true)
      end
    end
  end
end
