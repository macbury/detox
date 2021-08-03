FactoryBot.define do
  factory :audio do
    duration { 10 }
    uri { 'https://local.podcast.url/file.mp3' }
  end
end
