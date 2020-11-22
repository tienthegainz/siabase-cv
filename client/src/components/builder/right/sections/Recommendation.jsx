import { navigate } from 'gatsby';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../shared/Button';

const Recommendation = () => {
  const { t } = useTranslation();

  const goToRecommendation = () => {
    navigate('/app/recommendation');
  };

  return (
    <Button onClick={goToRecommendation}>
      {t('builder.recommendation.goToRecommendation')}
    </Button>
  );
};

export default memo(Recommendation);
