import React from "react";
import { StoryKind } from "@detox/api";
import Tabs from "@detox/styleguide/Header/Tabs";
import FeedTab from "../../../app/FeedTab";

export default function renderHeaderTitle(props, expanded : boolean) {
  return (
    <Tabs expanded={expanded} {...props}>
      <FeedTab kind={StoryKind.All} focusedIcon="earth" unfocusedIcon="earth-outline" />
      <FeedTab kind={StoryKind.Readable} focusedIcon="newspaper" unfocusedIcon="newspaper-outline" />
      <FeedTab kind={StoryKind.Playable} focusedIcon="play" unfocusedIcon="play-outline" />
      <FeedTab kind={StoryKind.Viewable} focusedIcon="aperture" unfocusedIcon="aperture-outline" />
    </Tabs>
  )
}