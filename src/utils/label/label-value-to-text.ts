import { DateTime } from 'luxon';
import { LabelData } from '~/types/schemas/label';

export const LabelValueToText = (value: string, data: LabelData, currentDate: Date) => {
  const date = DateTime.fromJSDate(currentDate);

  const hour = date.hour.toString().padStart(2, '0');
  const minute = date.minute.toString().padStart(2, '0');
  const second = date.second.toString().padStart(2, '0');
  const day = date.day.toString().padStart(2, '0');
  const month = date.month.toString().padStart(2, '0');
  const year = date.year;

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
      data.latestCheerDonor?.displayName ? data.latestCheerDonor?.displayName : 'Anonymous'
    )
    .replaceAll(
      '{{last cheer donor amount}}',
      data.latestCheerDonor?.amount ? data.latestCheerDonor?.amount.toString() : '0'
    )
    .replaceAll('{{current hour}}', hour.toString())
    .replaceAll('{{current minute}}', minute.toString())
    .replaceAll('{{current second}}', second.toString())
    .replaceAll('{{current day}}', day.toString())
    .replaceAll('{{current month}}', month.toString())
    .replaceAll('{{current year}}', year.toString())
    .replaceAll(regex, '<span>$1</span>');
};
