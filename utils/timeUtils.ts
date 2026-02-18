import { TimeLeft } from '../types';

export const DHAKA_TIMEZONE = 'Asia/Dhaka';

export const getDhakaTime = (): Date => {
  const now = new Date();
  // Get time string in Dhaka timezone
  const dhakaTimeString = now.toLocaleString("en-US", { timeZone: DHAKA_TIMEZONE });
  return new Date(dhakaTimeString);
};

export const getTimeRemaining = (targetDateStr: string, targetTimeStr: string): TimeLeft => {
  const now = getDhakaTime();

  // Combine date and time strings to create a target Date object in Dhaka time
  // Format target: "2026-04-21T10:00:00" assuming standard ISO input
  // We need to construct it carefully to ensure it's treated as Dhaka time
  
  // Create a date object from the string, then force it to represent that local time in Dhaka
  const [year, month, day] = targetDateStr.split('-').map(Number);
  
  // Parse "10:00 AM"
  const [time, modifier] = targetTimeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (hours === 12) {
    hours = 0;
  }
  if (modifier === 'PM') {
    hours = hours + 12;
  }

  // Construct the target date assuming the inputs are meant for Dhaka Timezone
  // Since we can't easily construct a Date object directly into a timezone without libraries like moment-timezone or date-fns-tz,
  // we will manually offset.
  
  // 1. Create a UTC date with the target components
  const targetUtc = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
  
  // 2. Create a UTC date for "Now" in Dhaka
  // We already have 'now' which is the current time shifted to local representation of Dhaka
  // But calculating diff is easier using timestamps.
  
  // Alternative robust approach without libraries:
  // Convert current real time to Dhaka Epoch
  const currentReal = new Date();
  const dhakaOffset = 6 * 60; // UTC+6 in minutes
  const localOffset = currentReal.getTimezoneOffset(); // in minutes (inverted)
  
  // The 'target' is physically in Dhaka. 
  // Let's create a string that Date.parse might accept with timezone, or simple subtraction.
  // Best way native:
  const targetISO = `${targetDateStr}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00+06:00`;
  const targetTime = new Date(targetISO).getTime();
  const currentTime = new Date().getTime(); // Current absolute time

  const totalSeconds = Math.max(0, Math.floor((targetTime - currentTime) / 1000));

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hoursLeft = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
  const secondsLeft = Math.floor(totalSeconds % 60);

  return { days, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft, totalSeconds };
};

export const formatDate = (dateString: string, lang: 'en' | 'bn'): string => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return formatter.format(date);
};