import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { useStoreData } from '@detox/store'
import { JobKind } from '@detox/api'
import InformationContent from '@detox/styleguide/ui/InformationContent'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import CenteredScrollView from '@detox/styleguide/ui/CenteredScrollView'
import { Header4 } from '@detox/styleguide/form/Text'
import JobItem from '@detox/styleguide/Admin/JobItem'
import BackButton from '@detox/styleguide/Header/BackButton'
import { adminPath } from '@detox/shared'
import Navbar from '@detox/styleguide/ui/Navbar'
import Tabs from '@detox/styleguide/Header/Tabs'
import Tab from '@detox/styleguide/Header/Tab'

import BackgroundJobsActions from './BackgroundJobsActions'
import { useTheme } from 'styled-components/native'


const Header = styled(Header4)`
  margin-bottom: 20px;
  margin-top: ${({ theme }) => theme.device === 'desktop' ? '0px' : '20px'};
  margin-left: ${({ theme }) => theme.device === 'desktop' ? '0px' : '25px'};
  margin-right: ${({ theme }) => theme.device === 'desktop' ? '0px' : '25px'};
`

function usePooling(jobKind : JobKind) {
  const isFocused = useIsFocused()

  const {
    startPolling,
    stopPolling
  } =  useStoreData(({ screens: { admin: { backgroundJob } } }) => ({
    stopPolling: backgroundJob.stopPolling,
    startPolling: backgroundJob.startPolling
  }))

  useEffect(() => {
    if (isFocused) {
      startPolling(jobKind)

      return () => stopPolling()
    } else {
      stopPolling()
    }
  }, [jobKind, isFocused, stopPolling, startPolling])
}

function useBackgroundJobs() {
  return useStoreData(({ screens: { admin: { backgroundJob } } }) => ({
    failedJobsCount: backgroundJob.failedJobsCount,
    processingJobsCount: backgroundJob.processingJobsCount,
    benchJobsCount: backgroundJob.benchJobsCount,
    currentJobs: backgroundJob.currentJobs,
  }))
}

function useSelectedJobKind() {
  const { params } = useRoute()
  return (params as any)?.jobKind || JobKind.Processing
}

function BackgroundJobTabs(props) {
  const {
    processingJobsCount,
    benchJobsCount,
    failedJobsCount
  } = useBackgroundJobs()
  
  const { device } = useTheme()
  const navigation = useNavigation()
  const selectedJobKind = useSelectedJobKind()

  return (
    <Tabs>
      <Tab
        onPress={() => navigation.setParams({ jobKind: JobKind.Processing })}
        bubble={processingJobsCount}
        focused={selectedJobKind === JobKind.Processing}
        focusedIcon="cube"
        unfocusedIcon="cube-outline" />
      <Tab
        onPress={() => navigation.setParams({ jobKind: JobKind.Bench })}
        bubble={benchJobsCount}
        focused={selectedJobKind === JobKind.Bench}
        focusedIcon="file-tray-full"
        unfocusedIcon="file-tray-full-outline" />
      <Tab
        onPress={() => navigation.setParams({ jobKind: JobKind.WithErrors })}
        bubble={failedJobsCount}
        focused={selectedJobKind === JobKind.WithErrors}
        focusedIcon="flame"
        unfocusedIcon="flame-outline" />
    </Tabs>
  )
}

export default function BackgroundJobsScreen() {
  const { t } = useTranslation()
  const selectedJobKind = useSelectedJobKind()
  const { currentJobs } = useBackgroundJobs()

  usePooling(selectedJobKind)
  useModalNavBar()
  
  const items = useMemo(() => (
    currentJobs.map((job) => {
      return <JobItem job={job} key={job.id} />
    })
  ), [currentJobs, selectedJobKind])

  return (
    <React.Fragment>
      <CenteredScrollView>
        <Header>{t(`screens.admin.background_jobs.kind.${selectedJobKind}`)}</Header>
        {items.length > 0 ? items : <InformationContent message="screens.admin.background_jobs.empty" icon="brain" />}
      </CenteredScrollView>
      <Navbar />
    </React.Fragment>
  )
}

BackgroundJobsScreen.getScreenOptions = (t, mobile, theme) => ({
  title: t('screens.admin.background_jobs.title'),
  headerLeft: (props) => <BackButton goBackFallback={adminPath()} {...props} />,
  headerTitle: (props) => <BackgroundJobTabs {...props} />,
  headerRight: (props) => <BackgroundJobsActions {...props} />,
  cardStyle: { backgroundColor: theme.colors.background }
})