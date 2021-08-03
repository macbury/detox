import GroupOption from "@detox/store/models/GroupOption";

export interface IFormDetailsProps {
  editable?: boolean
  selectedCount: number
  name: string
  icon: string
  searchChannelQuery: string
  setSearchChannelQuery(query : string)
  setName(newName : string)
  setIcon(newIcon : string)
}

export interface IGroupFormProps {
  DetailsForm()
  editable?: boolean
  options: GroupOption[]
}
