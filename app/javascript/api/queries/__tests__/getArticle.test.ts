import { GET_FULL_ARTICLE_QUERY, GET_BASIC_ARTICLE_QUERY } from '../getArticle'

it('should match basic query', () => {
  expect(GET_BASIC_ARTICLE_QUERY).toMatchGraphqlSchema()
})

it('should match full query', () => {
  expect(GET_FULL_ARTICLE_QUERY).toMatchGraphqlSchema()
})