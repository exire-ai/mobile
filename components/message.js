import React from "react";
import { BotMessage } from './messages/botMessage';
import { VenuesMessage } from './messages/venuesMessage';
import { UserMessage } from './messages/userMessage';
import { LoadingMessage } from './messages/loadingMessage';
import { FormMessage } from "./messages/formMessage";

export function Message({
  message,
  overMin,
  sameAsNext,
  owner,
  venues,
  first,
  form,
  navigation
}) {
  var spaceBelow = sameAsNext ? 1 : 5;
  spaceBelow = overMin ? spaceBelow : 5;
  var spaceAbove = first ? 0 : 5;
  var messageJSX = (
    <BotMessage message={message} spaceBelow={spaceBelow} spaceAbove={spaceAbove} />
  );
  if (venues.length > 0) {
    messageJSX = (
      <VenuesMessage venueData={venues} spaceBelow={spaceBelow} spaceAbove={spaceAbove} navigation={navigation}/>
    )
  } else if (owner) {
    messageJSX = (
      <UserMessage message={message} spaceBelow={spaceBelow} spaceAbove={spaceAbove}/>
    );
  } else if (message == "loadingloadingloading" && !owner) {
    return (
      <LoadingMessage />
    )
  } else if (form == "form") {
    messageJSX = (
      <FormMessage form={form} spaceBelow={spaceBelow} spaceAbove={spaceAbove} />
    );
  }
  return messageJSX;
}
