import React, { FC } from "react";
import { StoneCard } from "./stone-card";
import { ZeroJudgmentZoneText } from "./zero-judgement-zone.text";
import { SafeExpressionText } from "./safe-expression-text";
import { SpeakFreelyText } from "./speak-freely-text";
import { StayAnonymousText } from "./stay-anonymous-text";
import { SlideContainer } from "../../slide-container";


const SLIDE_INDEX = 1;

export const SafeSpace: FC = () => {
  return (
    <SlideContainer index={SLIDE_INDEX}>
      <ZeroJudgmentZoneText index={SLIDE_INDEX} />
      <SafeExpressionText index={SLIDE_INDEX} />
      <SpeakFreelyText index={SLIDE_INDEX} />
      <StayAnonymousText index={SLIDE_INDEX} />
      <StoneCard index={SLIDE_INDEX} />
    </SlideContainer>
  );
};

