FactoryBot.define do
  factory :session do
    association(:user)
    sequence(:name) { |index| "client#{index}" }

    ip { '127.0.0.1' }
    public_key { File.read(Rails.root.join('spec/fixtures/files/certs/ec256-public.pem')) }
  end
end
