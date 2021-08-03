# https://graphql-ruby.org/pagination/custom_connections.html
# https://github.com/bibendi/graphql-connections/blob/3bf3daa97ea1ff909fe1fbb8a88b3dbac0abd46e/lib/graphql/connections/stable.rb#L48
module Connections
  class StoriesConnection < GraphQL::Pagination::Connection
    def nodes
      @nodes ||= all_items.limit(per_page)
    end

    def has_next_page
      if first
        nodes.any? && items.where('stories.view_at > :after_date', after_date: nodes&.last&.view_at).exists?
      elsif before_date
        items.where('stories.view_at <= :before_date', before_date: before_date).exists?
      else
        false
      end
    end

    def has_previous_page
      throw 'not implemented'
    end

    def cursor_for(item)
      item.view_at.to_datetime.iso8601
    end

    private

    def total_count
      @total_count ||= items.count
    end

    def per_page
      @per_page ||= first || last || 100
    end

    def total_pages
      @total_pages ||= Math.ceil(total_count / per_page)
    end

    def decode_time(encoded_cursor)
      Time.zone.parse(encoded_cursor)
    rescue ArgumentError
      nil
    end

    def after_date
      @after_date ||= decode_time(after) if after
    end

    def before_date
      @before_date ||= decode_time(before) if before
    end

    def all_items
      items
        .yield_self { |scope| after_date.present? ? scope.where('stories.view_at < :after_date', after_date: after_date) : scope }
        .yield_self { |scope| before_date.present? ? scope.where('stories.view_at > :before_date', before_date: before_date) : scope }
    end
  end
end