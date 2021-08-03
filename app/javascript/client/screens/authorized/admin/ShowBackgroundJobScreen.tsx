import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components/native'
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import Fab from '@detox/styleguide/form/Fab'
import BackButton from '@detox/styleguide/Header/BackButton'
import Navbar from '@detox/styleguide/ui/Navbar'
import CenteredScrollView from '@detox/styleguide/ui/CenteredScrollView'
import Text, { Header4, Header2 } from '@detox/styleguide/form/Text'
import { adminBackgroundJobsPath, useNavigate } from '@detox/shared'
import { useStoreData } from '@detox/store'
import NotFoundOrLoading from '@detox/styleguide/ui/NotFoundOrLoading'


const Details = styled.View`
  margin-top: ${({ theme }) => theme.device === 'mobile' ? '30px' : '0px'};
`

const OptionHeader = styled(Header4)`
  margin-top: 10px;
  margin-left: ${({ theme }) => theme.device === "mobile" ? '25px' : '0px'};
  margin-right: ${({ theme }) => theme.device === "mobile" ? '25px' : '0px'};
`

const OptionValue = styled(Text)`
  margin-bottom: 10px;
  padding: 15px 25px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.device === "mobile" ? '0px' : '5px'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left-width: ${({ theme }) => theme.device === "mobile" ? '0px' : '1px'};
  border-right-width: ${({ theme }) => theme.device === "mobile" ? '0px' : '1px'};
`

function useBackgroundJob() {
  return useStoreData(({ screens: { admin: { backgroundJob } } }) => ({
    job: backgroundJob.job,
    loading: backgroundJob.isLoading,
    load: backgroundJob.load,
    deleteJobs: backgroundJob.delete
  }))
}

export default function ShowBackgroundJobScreen({ route } : StackScreenProps<any, any>) {
  const { jobId } = route.params
  const navigation = useNavigate()
  const isFocused = useIsFocused()
  const {
    job,
    loading,
    load,
    deleteJobs
  } = useBackgroundJob()

  useEffect(() => {
    if (isFocused) {
      load(jobId)
    }
  }, [load, jobId, isFocused])

  useEffect(() => {
    if (isFocused && job) {
      navigation.setOptions({
        title: `Job #${job.id}`
      })
    }
  }, [job, isFocused])

  const deleteCurrentJob = useCallback(async () => {
    if (await deleteJobs([job.id])) {
      navigation.navigate(adminBackgroundJobsPath())
    }
  }, [job, deleteJobs, navigation])

  if (!job || loading) {
    return <NotFoundOrLoading loading={loading} />
  }

  return (
    <React.Fragment>
      <CenteredScrollView>
        <Details>
          <OptionHeader>Job Class</OptionHeader>
          <OptionValue>{job.jobClass}</OptionValue>
          <OptionHeader>Arguments</OptionHeader>
          <OptionValue>{job.arguments}</OptionValue>
          {job.error &&<OptionHeader>Error</OptionHeader>}
          {job.error && <OptionValue>{job.error}</OptionValue>}
          {job.backtrace && <OptionValue>{job.backtrace}</OptionValue>}
        </Details>
      </CenteredScrollView>
      <Fab
        loading={loading}
        icon="trash-can"
        onPress={deleteCurrentJob} />
      <Navbar />
    </React.Fragment>
  )
}

ShowBackgroundJobScreen.getScreenOptions = (t, mobile, theme) => ({
  title: t('screens.admin.show_background_jobs.title'),
  headerLeft: (props) => <BackButton goBackFallback={adminBackgroundJobsPath()} {...props} />,
  cardStyle: { backgroundColor: theme.colors.background }
})