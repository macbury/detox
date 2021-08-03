FactoryBot.define do
  factory :article_story, class: 'Story' do
    title { Faker::Book.title }
    permalink { Faker::TvShows::SiliconValley.url }
    summary { Faker::Lorem.paragraphs(number: 1) }
    published_at { Time.zone.now }
    view_at { Time.zone.now }
    sequence(:guid) { |guid| "guid:#{guid}" }

    transient do
      body { Faker::Lorem.paragraphs(number: 20) }
    end

    trait :with_channel do
      association(:channel, :with_user)
    end

    before(:create) do |story, evaluator|
      story.update!(
        attachment: Article.new(body: evaluator.body)
      )
    end
  end

  factory :audio_story, class: 'Story' do
    title { Faker::Book.title }
    permalink { Faker::TvShows::SiliconValley.url }
    summary { Faker::Lorem.paragraphs(number: 1) }
    published_at { Time.zone.now }
    view_at { Time.zone.now }
    sequence(:guid) { |guid| "guid:#{guid}" }

    transient do
      body { Faker::Lorem.paragraphs(number: 20) }
    end

    trait :with_channel do
      association(:channel, :with_user)
    end

    before(:create) do |story, evaluator|
      story.update!(
        attachment: build(:audio)
      )
    end
  end
end
