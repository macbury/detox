import { JobKind } from '@detox/api/graphql';
import { observable, action, flow } from 'mobx'
import getJobsSummaryQuery, { TJobsStatusObservableQuery, TJobsStatus, JobBlueprint } from '@detox/api/queries/getJobsSummary'
import getJobQuery from '@detox/api/queries/getJob'
import clearJobsMutation from '@detox/api/mutations/clearJobs'
import { NonPersistableStore } from '../../core/SubStore'

const POOL_INTERVAL = 1000

export default class BackgroundJobsStore extends NonPersistableStore {
  @observable
  public job : JobBlueprint
  @observable
  public processingJobsCount : number = 0
  @observable
  public benchJobsCount : number = 0
  @observable
  public failedJobsCount : number = 0
  @observable
  public currentJobs: JobBlueprint[] = []
  private poolSubscription : any

  private jobsStatusQuery : TJobsStatusObservableQuery

  public load = flow(function * (this : BackgroundJobsStore, jobId: string) {
    this.job = null
    this.state = 'Loading'
    this.job = yield getJobQuery(this.api, jobId)
    this.state = 'Ready'
  }.bind(this))

  public clearQueue = flow (function * (this : BackgroundJobsStore) {
    const jobIds = this.currentJobs.map(({ id }) => id)
    if (yield this.delete(jobIds)) {
      this.currentJobs = []
      return true
    } else {
      return false
    }
  }.bind(this))

  public delete = flow (function * (this : BackgroundJobsStore, jobIds: [string]) {
    if (yield this.ui.confirm.show('screens.admin.background_jobs.dialogs.delete')) {
      this.ui.showProgressDialog()
      this.job = null
      yield clearJobsMutation(this.api, jobIds)
      this.ui.hideProgressDialog()

      return true
    }

    return false
  }.bind(this))

  @action.bound
  private onJobStatusUpdate({ data } : { data : TJobsStatus }) {
    const {
      current: {
        jobs: currentJobs
      },
      processing: {
        totalCount: processingJobsCount,
      },
      bench: {
        totalCount: benchJobsCount
      },
      failed: {
        totalCount: failedJobsCount
      }
    } = data

    this.processingJobsCount = processingJobsCount
    this.failedJobsCount = failedJobsCount
    this.benchJobsCount = benchJobsCount
    this.currentJobs = currentJobs
  }

  @action.bound
  public startPolling(jobKind : JobKind) {
    this.stopPolling()

    this.currentJobs = []
    this.job = null
    this.jobsStatusQuery = getJobsSummaryQuery(this.api, jobKind)
    this.poolSubscription = this.jobsStatusQuery.subscribe(this.onJobStatusUpdate)
    this.jobsStatusQuery.refetch()
    this.jobsStatusQuery.startPolling(POOL_INTERVAL)
  }

  @action.bound
  public stopPolling() {
    this.jobsStatusQuery?.stopPolling()
    this.poolSubscription?.unsubscribe()
  }

  @action.bound
  public clear(): void {
    super.clear()
    this.currentJobs = []
    this.job = null
    this.processingJobsCount = this.failedJobsCount = this.benchJobsCount = 0
    this.stopPolling()
  }
}