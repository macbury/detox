FactoryBot.define do
  factory :reasons_com, class: 'Channel' do
    name { 'Reason' }
    source { 'https://reason.com/latest/feed/' }
    site_url { 'https://reason.com' }
    kind { 'rss' }
    user

    after(:create) do |channel, _evaluator|
      {
        'Has the U.S. Government Finally Spent Too Much?' => 'https://reason.com/2020/07/09/has-the-u-s-government-finally-spent-too-much/',
        "The Reaction to the Harper's Letter on Cancel Culture Proves Why It Was Necessary" => 'https://reason.com/2020/07/08/the-reaction-to-the-harpers-letter-on-cancel-culture-proves-why-it-was-necessary/',
        "Did Trump's Coronavirus Stimulus Save 51 Million Jobs? The Claim Relies on Shaky Math and Questionable Economics." => 'https://reason.com/2020/07/08/did-trumps-coronavirus-stimulus-save-51-million-jobs-the-claim-relies-on-shaky-math-and-questionable-economics/',
        "Seattle's 'Autonomous Zone' Is Dead, But Its Amazon Tax Has Come Roaring Back to Life" => 'https://reason.com/2020/07/08/seattles-autonomous-zone-is-dead-but-its-amazon-tax-has-come-roaring-back-to-life/'
      }.each do |title, permalink|
        create(:article_story, channel: channel, title: title, permalink: permalink, is_read: false)
      end

      {
        'Brickbat: Ooooh, That Smell' => 'https://reason.com/2020/07/09/brickbat-ooooh-that-smell/',
        'Massachusetts Regulators Knowingly Drive Vapers to the Black Market' => 'https://reason.com/2020/07/08/massachusetts-regulators-knowingly-drive-vapers-to-the-black-market/',
        "The Paycheck Protection Program Is a Mess. Here's Who Is Benefitting From the Dysfunction." => 'https://reason.com/2020/07/07/the-paycheck-protection-program-is-a-mess-heres-who-is-benefitting-from-the-dysfunction/'
      }.each do |title, permalink|
        create(:article_story, channel: channel, title: title, permalink: permalink, is_read: true)
      end
    end
  end

  factory :developer_news, class: 'Channel' do
    name { 'Developer News' }
    source { 'https://www.freecodecamp.org/news' }
    site_url { 'https://www.freecodecamp.org/news/rss/' }
    kind { 'rss' }
    user

    after(:create) do |channel, _evaluator|
      {
        "How to Calculate the Average of a List — Statistics and Python's Mean Function Explained in Detail" => 'https://www.freecodecamp.org/news/how-to-calculate-the-average-of-a-list-statistics-and-pythons-mean-function-explained-in-detail/',
        'Alternative Career Paths for Software Developers' => 'https://www.freecodecamp.org/news/alternative-career-paths/'
      }.each do |title, permalink|
        create(:article_story, channel: channel, title: title, permalink: permalink, is_read: false)
      end

      {
        'How to Create a Dynamic Rick and Morty Wiki Web App with Next.js ' => 'https://www.freecodecamp.org/news/how-to-create-a-dynamic-rick-and-morty-wiki-web-app-with-next-js/',
        'What is a Correlation Coefficient? The r Value in Statistics Explained ' => 'https://www.freecodecamp.org/news/what-is-a-correlation-coefficient-r-value-in-statistics-explains/'
      }.each do |title, permalink|
        create(:article_story, channel: channel, title: title, permalink: permalink, is_read: true)
      end
    end
  end

  factory :codest, class: 'Channel' do
    name { 'Codest' }
    source { 'https://codesthq.com' }
    site_url { 'https://codesthq.com/feed/' }
    kind { 'rss' }
    user

    after(:create) do |channel, _evaluator|
      {
        "More efficient software development. Follow the most important rules Ruby" => 'https://rss.macbury.ninja/feed/41/entry/5800',
        'Why is the UK a great place to set up a global business? Ruby' => 'https://rss.macbury.ninja/feed/41/entry/6062'
      }.each do |title, permalink|
        create(:article_story, channel: channel, title: title, permalink: permalink, is_read: false)
      end

      {
        'Fintech Inn 2019. What is the state of fintech in the Baltics? Ruby' => 'https://rss.macbury.ninja/feed/41/entry/6821',
        'Hybrid Agile and Waterfall. Is it a good approach for software development? Ruby' => 'https://rss.macbury.ninja/feed/41/entry/7411'
      }.each do |title, permalink|
        create(:article_story, channel: channel, title: title, permalink: permalink, is_read: true)
      end
    end
  end
end
