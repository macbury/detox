import { action } from 'mobx'
import { NonPersistableStore } from '../core/SubStore'
import SignInStore from './SignInStore'
import DiscoverChannelStore from './DiscoverChannelStore'
import StoriesStore from './Stories'
import ShowChannelStore from './ShowChannelStore'
import EditChannelStore from './EditChannelStore'
import ImportOpmlStore from './ImportOpmlStore'
import Admin from './Admin'
import Groups from './Groups'


/**
 * Stores used only by assigned screen
 */
export default class Screens extends NonPersistableStore {
  public readonly signIn : SignInStore
  public readonly discoveryChannel : DiscoverChannelStore
  public readonly stories : StoriesStore
  public readonly showChannel: ShowChannelStore
  public readonly editChannel: EditChannelStore
  public readonly importOpml: ImportOpmlStore
  public readonly admin : Admin
  public readonly groups: Groups

  constructor(parent) {
    super(parent)

    this.signIn = new SignInStore(this)
    this.discoveryChannel = new DiscoverChannelStore(this)
    this.stories = new StoriesStore(this)
    this.showChannel = new ShowChannelStore(this)
    this.editChannel = new EditChannelStore(this)
    this.importOpml = new ImportOpmlStore(this)
    this.groups = new Groups(this)

    this.admin = new Admin(this)
  }

  @action.bound
  public clear() {
    super.clear()
    this.signIn.clear()
    this.discoveryChannel.clear()
    this.stories.clear()
    this.showChannel.clear()
    this.editChannel.clear()
    this.importOpml.clear()
    this.admin.clear()
    this.groups.clear()
  }
}