'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import RetrievalParamConfig from '../retrieval-param-config'
import type { RetrievalConfig } from '@/types/app'
import { RETRIEVE_METHOD } from '@/types/app'
import RadioCard from '@/app/components/base/radio-card'
import { PatternRecognition, Semantic } from '@/app/components/base/icons/src/vender/solid/development'
import { FileSearch02 } from '@/app/components/base/icons/src/vender/solid/files'

type Props = {
  value: RetrievalConfig
  onChange: (value: RetrievalConfig) => void
}

const RetrievalMethodConfig: FC<Props> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation()

  return (
    <div className='space-y-2'>
      <RadioCard
        icon={<Semantic className='w-4 h-4 text-[#7839EE]' />}
        title={t('dataset.retrieval.semantic_search.title')}
        description={t('dataset.retrieval.semantic_search.description')}
        isChosen={value.search_method === RETRIEVE_METHOD.semantic}
        onChosen={() => onChange({
          ...value,
          search_method: RETRIEVE_METHOD.semantic,
        })}
        chosenConfig={
          <RetrievalParamConfig
            type={RETRIEVE_METHOD.semantic}
            value={value}
            onChange={onChange}
          />
        }
      />
      <RadioCard
        icon={<FileSearch02 className='w-4 h-4 text-[#7839EE]' />}
        title={t('dataset.retrieval.full_text_search.title')}
        description={t('dataset.retrieval.full_text_search.description')}
        isChosen={value.search_method === RETRIEVE_METHOD.fullText}
        onChosen={() => onChange({
          ...value,
          search_method: RETRIEVE_METHOD.fullText,
        })}
        chosenConfig={
          <RetrievalParamConfig
            type={RETRIEVE_METHOD.fullText}
            value={value}
            onChange={onChange}
          />
        }
      />
      <RadioCard
        icon={<PatternRecognition className='w-4 h-4 text-[#7839EE]' />}
        title={
          <div className='flex items-center space-x-1'>
            <div>{t('dataset.retrieval.hybrid_search.title')}</div>
            <div className='flex h-full items-center px-1.5 rounded-md border border-[#E0EAFF] text-xs font-medium text-[#444CE7]'>{t('dataset.retrieval.hybrid_search.recommend')}</div>
          </div>
        }
        description={t('dataset.retrieval.hybrid.description')}
        isChosen={value.search_method === RETRIEVE_METHOD.hybrid}
        onChosen={() => onChange({
          ...value,
          search_method: RETRIEVE_METHOD.hybrid,
        })}
        chosenConfig={
          <RetrievalParamConfig
            type={RETRIEVE_METHOD.hybrid}
            value={value}
            onChange={onChange}
          />
        }
      />
    </div>
  )
}
export default React.memo(RetrievalMethodConfig)
