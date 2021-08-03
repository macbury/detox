import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { JobBlueprint } from '@detox/api'
import { adminShowBackgroundJobsPath } from '@detox/shared/urls'

import Card from '../Card'
import DurationText from '../ui/DurationText'
import Header, {
  HeaderContent,
  HeaderTitle,
  HeaderSubTitle,
} from '../Card/Header'

import { useDuration, usePublishedAtTime } from '../helpers/useTime'
import Link from '../Link'

export interface IJobItemProps {
  job: JobBlueprint
}

const Icon = styled(MaterialIcon)`
  margin-right: 15px;
  margin-left: 5px;
`

const JobCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.device === 'desktop' ? '20px' : '10px'};
  margin-left: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  margin-right: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  width: 100%;
`

const ErrorSubTitle = styled(HeaderSubTitle)`
  color: ${({ theme }) => theme.colors.error};
`

const RunAtTime = styled(HeaderSubTitle)`
`

export default function JobItem({ job } : IJobItemProps) {
  const theme = useTheme()
  const runningForMilliseconds = useDuration(job.lockedAt)
  const runAtTime = usePublishedAtTime(job.runAt)

  return (
    <Link to={adminShowBackgroundJobsPath(job.id)}>
      <JobCard shadow={2}>
        <Header>
          <Icon
            color={theme.colors.text}
            name={job.error ? "fire" : "chemical-weapon"}
            size={32} />
          <HeaderContent>
            <HeaderTitle>{job.jobClass}: {job.id}</HeaderTitle>
            {
              job.error && <ErrorSubTitle>{job.error}</ErrorSubTitle> 
            }
          </HeaderContent>
          {job.lockedAt ? <DurationText>{runningForMilliseconds}</DurationText> : <RunAtTime>{runAtTime}</RunAtTime>}
        </Header>
      </JobCard>
    </Link>
  )
}