require 'rails_helper'

RSpec.shared_examples 'success validator' do |url|
  describe "when url is #{url}" do
    it { expect(Urls::Validate.call(url)).to be(true) }
  end
end

RSpec.shared_examples 'failure validator' do |url|
  describe "when url is #{url}" do
    it { expect(Urls::Validate.call(url)).to be(false) }
  end
end

RSpec.describe Urls::Validate do
  it_behaves_like 'success validator', 'https://briancallahan.net/blog/20200812.html'
  it_behaves_like 'success validator', 'http://macbury.ninja/'

  it_behaves_like 'failure validator', 'this is totally breaken'
  it_behaves_like 'failure validator', "data:image/png;base64,asdasdasdasdasdasd=="
  it_behaves_like 'failure validator', ""
end