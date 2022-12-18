import { LabelData } from './../../types/schemas/label';

export const LabelValueToText = (value: string, data: LabelData) => {
  const regex = /\*\*(.*?)\*\*/g;
  return value
    .replaceAll(
      '{{last subscriber}}',
      data.latestSubscriber?.displayName ? data.latestSubscriber?.displayName : ''
    )
    .replaceAll(
      '{{last follower}}',
      data.latestFollower?.displayName ? data.latestFollower?.displayName : ''
    )
    .replaceAll(
      '{{subscriber count}}',
      data.subscriptionCount.amount ? data.subscriptionCount.amount.toString() : '0'
    )
    .replaceAll(
      '{{follower count}}',
      data.followerCount.amount ? data.followerCount.amount.toString() : '0'
    )
    .replaceAll(
      '{{viewer count}}',
      data.viewerCount.amount ? data.viewerCount.amount.toString() : '0'
    )
    .replaceAll(
      '{{last cheer donor}}',
      data.lastCheerDonor?.displayName ? data.lastCheerDonor?.displayName : 'Anonymous'
    )
    .replaceAll(
      '{{last cheer donor amount}}',
      data.lastCheerDonor?.amount ? data.lastCheerDonor?.amount.toString() : '0'
    )
    .replaceAll(regex, '<span>$1</span>');
};
