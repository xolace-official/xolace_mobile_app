import React, { FC } from "react";
import { OneDayAtATimeText} from "./one-day-at-a-time-text";
import { BlueCard } from "./blue-card";
import { StoneCard } from "./stone-card";
import { SlideContainer } from "../../slide-container";

// longevity-deck-onboarding-animation 🔽

const SLIDE_INDEX = 3;

export const GrowAndHeal: FC = () => {
  return (
    <SlideContainer index={SLIDE_INDEX}>
      <StoneCard index={SLIDE_INDEX} />
      <BlueCard index={SLIDE_INDEX} />
      <OneDayAtATimeText index={SLIDE_INDEX} />
    </SlideContainer>
  );
};

// longevity-deck-onboarding-animation 🔼
