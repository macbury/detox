require 'rails_helper'

RSpec.describe Extract::Summary do
  subject(:summary) { described_class.call(body) }

  describe 'when Business Insider' do
    let(:body) { fixture_file_upload('summary/bin.html').read }

    it { is_expected.to eq("W najbliższy weekend zakupów nie zrobimy - niedzielny zakaz handlu zbiega się bowiem ze świętem Wojska Polskiego przypadającym w sobotę. W odpowiedzi na ten \"niehandlowy weekend\" sieć Biedronka postanowiła nie zamykać 100 swoich sklepów przez niemal dwie doby, a w kolejnych 2 tys. placówek wydłużyć godziny pracy.Setka sklepów sieci Biedronka, kt...") }
  end
end