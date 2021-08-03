module Types
  class RewriteRuleEnum < Types::BaseEnum
    description 'How imported channel entry be transformed'
    Channel::REWRITE_RULES.each do |rule|
      value rule.camelcase, value: rule
    end
  end
end
