import React, { FC } from "react";
import { JoinCampfireText } from "./join-campfires";
import { SupportiveVoicesText } from "./supportive-voices-text";
import { PeopleWhoGetItText } from "./people-who-get-it-text";
import { SlideContainer } from "../../slide-container";

// longevity-deck-onboarding-animation 🔽

const SLIDE_INDEX = 2;

export const FindYourPeople: FC = () => {
  return (
    <SlideContainer index={SLIDE_INDEX}>
      <JoinCampfireText index={SLIDE_INDEX} />
      <SupportiveVoicesText index={SLIDE_INDEX} />
      <PeopleWhoGetItText index={SLIDE_INDEX} />
    </SlideContainer>
  );
};

// longevity-deck-onboarding-animation 🔼
