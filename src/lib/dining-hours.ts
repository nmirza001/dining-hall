export type Campus = 'csb' | 'sju';
export type CrowdLevel = 'Unknown' | 'Low' | 'Medium' | 'High';
export type MealPeriod = 'Breakfast' | 'Lunch' | 'Dinner' | 'Closed';

interface Hours {
  open: number | null;
  close: number | null;
}

interface CSBSchedule {
  weekday: Hours;
  weekend: Hours;
}

interface SJUSchedule {
  weekday: Hours;
  friday: Hours;
  saturday: Hours;
  sunday: Hours;
}

interface DiningSchedule {
  csb: CSBSchedule;
  sju: SJUSchedule;
}

export const DINING_HOURS: DiningSchedule = {
  csb: {
    weekday: {
      open: 7.00,  // 7:00 AM
      close: 22.50 // 7:30 PM
    },
    weekend: {
      open: 9.00,  // 9:00 AM
      close: 19.50 // 7:30 PM
    }
  },
  sju: {
    weekday: {
      open: 7.00,  // 7:00 AM
      close: 22.50 // 7:30 PM
    },
    friday: {
      open: 7.00,  // 7:00 AM
      close: 19.50 // 7:30 PM
    },
    saturday: {
      open: 9.00,  // 9:00 AM
      close: 18.00 // 6:00 PM
    },
    sunday: {
      open: 9.00,  // 9:00 AM
      close: 19.50 // 7:30 PM
    }
  }
};