export const calculateWorkPeriod = (startDate: string, locale: string = 'ru'): string => {
  const start = new Date(startDate);
  const now = new Date();
  
  // Calculate total months including the current partial month
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth() + 1; // Add 1 to include current month
  
  // If current day is before start day, we haven't completed the current month
  if (now.getDate() < start.getDate()) {
    months--;
  }
  
  // If months >= 12, convert to years
  if (months >= 12) {
    years += Math.floor(months / 12);
    months = months % 12;
  }
  
  // If months is negative, adjust years and months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (locale === 'en') {
    const startMonth = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    let periodText = `${startMonth} — present`;
    
    if (years > 0 && months > 0) {
      periodText += ` (${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''})`;
    } else if (years > 0) {
      periodText += ` (${years} year${years > 1 ? 's' : ''})`;
    } else if (months > 0) {
      periodText += ` (${months} month${months > 1 ? 's' : ''})`;
    }
    
    return periodText;
  } else {
    const startMonth = start.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
    const capitalizedMonth = startMonth.charAt(0).toUpperCase() + startMonth.slice(1);
    let periodText = `${capitalizedMonth} — сейчас`;
    
    if (years > 0 && months > 0) {
      const yearText = getYearText(years);
      const monthText = getMonthText(months);
      periodText += ` (${years} ${yearText} ${months} ${monthText})`;
    } else if (years > 0) {
      const yearText = getYearText(years);
      periodText += ` (${years} ${yearText})`;
    } else if (months > 0) {
      const monthText = getMonthText(months);
      periodText += ` (${months} ${monthText})`;
    }
    
    return periodText;
  }
};

const getYearText = (years: number): string => {
  if (years === 1) return 'год';
  if (years >= 2 && years <= 4) return 'года';
  return 'лет';
};

const getMonthText = (months: number): string => {
  if (months === 1) return 'месяц';
  if (months >= 2 && months <= 4) return 'месяца';
  return 'месяцев';
};

export const calculateTotalExperience = (locale: string = 'ru'): string => {
  // Work experience periods
  const experiences = [
    { start: '2024-09-01', end: null }, // Callibri - current
    { start: '2024-01-01', end: '2024-08-31' }, // Simple IT
    { start: '2023-02-01', end: '2023-12-31' }, // CableWalker
    { start: '2021-08-01', end: '2022-12-31' }  // MEDICOS
  ];

  let totalMonths = 0;

  experiences.forEach((exp, index) => {
    const startDate = new Date(exp.start);
    const endDate = exp.end ? new Date(exp.end) : new Date();
    
    // Calculate months between dates more accurately
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    
    // For ended jobs, include the end month if we've passed the start day
    // For current job, include current month if we've passed the start day
    if (endDate.getDate() >= startDate.getDate()) {
      months++; // Include the end/current month
    }
    
    // Handle negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Convert to total months for this period
    const periodMonths = years * 12 + months;
    totalMonths += periodMonths;
  });

  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (locale === 'en') {
    if (totalYears > 0 && remainingMonths > 0) {
      return `${totalYears} year${totalYears > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    } else if (totalYears > 0) {
      return `${totalYears} year${totalYears > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  } else {
    if (totalYears > 0 && remainingMonths > 0) {
      const yearText = getYearText(totalYears);
      const monthText = getMonthText(remainingMonths);
      return `${totalYears} ${yearText} ${remainingMonths} ${monthText}`;
    } else if (totalYears > 0) {
      const yearText = getYearText(totalYears);
      return `${totalYears} ${yearText}`;
    } else {
      const monthText = getMonthText(remainingMonths);
      return `${remainingMonths} ${monthText}`;
    }
  }
};
