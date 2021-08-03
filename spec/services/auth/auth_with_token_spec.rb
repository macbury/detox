require 'rails_helper'

RSpec.describe Auth::AuthWithToken do
  subject(:current_session) { described_class.new(access_token).call }

  let!(:user) { create(:user, :with_session) }
  let(:session) { user.sessions.first }

  after do
    Timecop.return
  end

  describe 'when valid access token' do
    let(:access_token) { 'eyJhbGciOiJFUzI1NiJ9.eyJhdWQiOiIqIiwiaXNzIjoiMjhiZjEzMWYtNjU1ZC00NmY0LWE3MzEtMzVlOTI5MzkxOWUxIiwiZXhwIjoxNjE4MjE4MjA4fQ.pTtVVIW4DfQLvuZhMS8L7uDTjQ6kzTAWTP7XxRR47kjrqxGMgPMn4OZ9uN2whrARJiSDtbc9jV6zvpv8ioLNmw' }

    describe 'and did not expire' do
      before do
        Timecop.freeze(Time.zone.parse("2021-04-12 10:53:52 +0200"))
      end

      it 'returns existing valid token' do
        expect(current_session).to eq(session)
      end
    end

    describe 'and did expire' do
      before do
        Timecop.freeze(10.minutes.from_now)
      end

      it { is_expected.to be_falsey }
    end
  end

  describe 'invalid token' do
    let(:access_token) { 'this should explode' }

    it { is_expected.to be_falsey }
  end

  describe 'other token' do
    let(:access_token) { 'eyJhbGciOiJFUzI1NiJ9.eyJhdWQiOiIqIiwiaXNzIjoiMjhiZjEzMWYtNjU1ZC00NmY0LWE3MzEtMzVlOTI5MzkxOWUxIiwiZXhwIjoxNjE4MjE4NzkxfQ.kUojJ8z1ulgh_9sZWxJHT2aedii7yyzKAbw0AeL8DhNAY7B8OYwnCWmx1l6iE7KQtH4AlRvCj_kLU772BEt5vg' }

    it { is_expected.to be_falsey }
  end
end