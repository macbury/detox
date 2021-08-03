require 'rails_helper'

RSpec.describe GraphqlController, type: :controller do
  include_context 'asyncReactor'

  it 'does authorization' do
    session = create(:session)
    request.headers[:Authorization] = 'Token token=random-token'

    expect(Auth::AuthWithToken).to receive(:call).with('random-token').and_return(session)

    post :execute

    expect(assigns(:current_session)).to eq(session)
    expect(response).to have_http_status(:success)
  end
end